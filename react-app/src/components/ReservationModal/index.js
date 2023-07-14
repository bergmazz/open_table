import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getDetailsRestaurant } from "../../store/restaurantDetails";
import { editReservations } from "../../store/reservation";
import { useModal } from "../../context/Modal";
import "./ReservationModal.css";


const ReservationModal = ( { reservation } ) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    let dateTime = new Date( reservation.reservationTime )
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let slashDate = dateTime.toLocaleDateString( "en-US" );
    let dateParts = slashDate.split( "/" );
    let month = dateParts[ 0 ];
    let day = dateParts[ 1 ];
    const year = dateParts[ 2 ];
    if ( month.length === 1 ) {
        month = "0" + month;
    }
    if ( day.length === 1 ) {
        day = "0" + day;
    }
    if ( hours < 10 ) {
        hours = "0" + hours;
    }
    // if ( minutes == 0 ) {
    //     minutes = "0" + minutes;
    // }


    const [ numberOfPeople, setNumberOfPeople ] = useState( reservation.numberOfPeople );
    const [ reservationTime, setReservationTime ] = useState( reservation.reservationTime );
    const [ date, setDate ] = useState( `${ year }-${ month }-${ day }` );
    const [ time, setTime ] = useState( `${ hours }:${ minutes }:00` );
    const [ status, setStatus ] = useState( reservation.status );
    const [ notes, setNotes ] = useState( reservation.notes );
    const [ errors, setErrors ] = useState( [] );

    // const { id } = useParams();

    const currentUser = useSelector( state => state.session.user )

    useEffect( () => {
        if ( date && time ) {
            setReservationTime( `${ date } ${ time }` )
        }
    }, [ date, time ] )

    if ( !currentUser ) return <Redirect to="/signup" />;

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        if ( currentUser ) {
            console.log( " reservationTime: ", reservationTime )
            console.log( " numberOfPeople: ", numberOfPeople )
            console.log( " status: ", status )
            let data = await dispatch( editReservations(
                reservation.restaurantId, reservation.id, numberOfPeople, reservationTime, status, notes
            ) );
            // console.log( '-------------data-------', data )
            if ( !data.id ) {
                if ( typeof data[ 0 ] == "object" ) {
                    data = Object.values( data[ 0 ] )
                }
                // const errorArray = Object.values( data ).map( ( error ) => error );
                // setErrors( errorArray );
                setErrors( data )
            } else {
                history.push( "/user" );
            }
        } else {
            setErrors( [ 'Please create an account' ] );
        }
    };


    return (
        <div className="reservation-form-container">
            {/* <h1>Reservation Form</h1> */ }
            <form className="mreserve" onSubmit={ handleSubmit }>
                <div className="mparty-size">Party Size</div>
                <label >
                    <input
                        className="mparty-select"
                        type="number"
                        value={ numberOfPeople }
                        onChange={ ( e ) => setNumberOfPeople( e.target.value ) }
                    />
                </label>
                {/* { errors.numberOfPeople && <span>This field is required</span> } */ }

                <div className="mdate-time">Date and Time</div>
                <label className="mdate">
                    {/* <i className="fas fa-calendar"></i> */ }
                    <input
                        className="mdate"
                        type="date"
                        id="date"
                        value={ date }
                        onChange={ ( e ) => setDate( e.target.value ) }
                    />
                </label>
                <label >
                    <input
                        className="mtime"
                        type="time"
                        id="time"
                        value={ time }
                        onChange={ ( e ) => setTime( e.target.value ) }
                    />
                </label>

                <label >
                    Notes
                    <input
                        className="mnotes"
                        type="text"
                        id="notes"
                        value={ notes }
                        onChange={ ( e ) => setNotes( e.target.value ) }
                    />
                </label>


                <button className="mbook" type="submit" >Edit Reservation</button>
                <ul>
                    { errors.map( ( error, idx ) => <li key={ idx }>{ error }</li> ) }
                </ul>

            </form>
        </div>
    );
};

export default ReservationModal
