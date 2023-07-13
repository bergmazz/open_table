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

    console.log( "---------reservation---", reservation )

    const [ numberOfPeople, setNumberOfPeople ] = useState( 2 );
    const [ reservationTime, setReservationTime ] = useState( "" );
    const [ date, setDate ] = useState( "" );
    const [ time, setTime ] = useState( "" );
    const [ status, setStatus ] = useState( "Confirmed" );
    const [ notes, setNotes ] = useState( "" );
    const [ errors, setErrors ] = useState( [] );

    const { id } = useParams();
    // useEffect( () => {
    //     dispatch( getDetailsRestaurant( id ) );
    // }, [ dispatch ] );

    const currentUser = useSelector( state => state.session.user )
    // const restaurant = useSelector( state => state.restaurantDetails )

    useEffect( () => {
        if ( date && time ) {
            let dateObject = new Date( `${ date }T${ time }` )
            const year = dateObject.getUTCFullYear();
            const month = `0${ dateObject.getUTCMonth() + 1 }`.slice( -2 ); // Months are zero-indexed, so add 1
            const day = `0${ dateObject.getUTCDate() }`.slice( -2 );
            const hours = `0${ dateObject.getUTCHours() }`.slice( -2 );
            const minutes = `0${ dateObject.getUTCMinutes() }`.slice( -2 );
            const seconds = `0${ dateObject.getUTCSeconds() }`.slice( -2 );
            setReservationTime( `${ year }-${ month }-${ day } ${ hours }:${ minutes }:${ seconds }` )
        }
    }, [ date, time ] )

    if ( !currentUser ) return <Redirect to="/signup" />;

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        if ( currentUser ) {
            // console.log( " reservationTime: ", reservationTime )
            // console.log( " numberOfPeople: ", numberOfPeople )
            // console.log( " status: ", status )
            let data = await dispatch( editReservations(
                id, numberOfPeople, reservationTime, status, notes
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
    // if ( restaurant.slots ) {
    //     console.log( "restaurant slots:", Object.values( restaurant.slots ) )
    // }

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
                    {/* Notes: */ }
                    <input
                        className="mnotes"
                        type="text"
                        id="notes"
                        onChange={ ( e ) => setNotes( e.target.value ) }
                        placeholder="Leave a note, if you'd like."
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
