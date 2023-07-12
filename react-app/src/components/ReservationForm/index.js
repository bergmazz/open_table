import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getDetailsRestaurant } from "../../store/restaurantDetails";
import { addReservationThunk } from "../../store/reservation";
import "./ReservationForm.css";

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String( today.getMonth() + 1 ).padStart( 2, "0" );
    const day = String( today.getDate() ).padStart( 2, "0" );
    return `${ year }-${ month }-${ day }`;
};

const getOneHourFromNow = () => {
    const currentTime = new Date();
    currentTime.setHours( currentTime.getHours() + 1 );
    currentTime.setMinutes( Math.ceil( currentTime.getMinutes() / 30 ) * 30 ); // Round up to next 30-minute increment
    const hours = String( currentTime.getHours() ).padStart( 2, "0" );
    const minutes = String( currentTime.getMinutes() ).padStart( 2, "0" );
    return `${ hours }:${ minutes }`;
};

const ReservationForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [ numberOfPeople, setNumberOfPeople ] = useState( 2 );
    const [ reservationTime, setReservationTime ] = useState( "" );
    const [ date, setDate ] = useState( getTodayDate() );
    const [ time, setTime ] = useState( getOneHourFromNow() );
    const [ status, setStatus ] = useState( "Confirmed" );
    const [ notes, setNotes ] = useState( "" );
    const [ errors, setErrors ] = useState( [] );

    const { id } = useParams();
    // useEffect( () => {
    //     dispatch( getDetailsRestaurant( id ) );
    // }, [ dispatch ] );

    const currentUser = useSelector( state => state.session.user )
    // const restaurant = useSelector( state => state.restaurantDetails )
    const points = useSelector( ( state ) => state.reservations.points );

    const handleAddPoints = () => {
        const newPoints = points + 100;
        dispatch( { type: "UPDATE_POINTS", points: newPoints } );
    };


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
            let data = await dispatch( addReservationThunk(
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
            <form className="reserve" onSubmit={ handleSubmit }>
                <label className="num">

                    <input
                        type="number"
                        value={ numberOfPeople }
                        onChange={ ( e ) => setNumberOfPeople( e.target.value ) }
                    />
                </label>
                {/* { errors.numberOfPeople && <span>This field is required</span> } */ }

                <label className="date">
                    <i className="fas fa-calendar"></i>
                    <input
                        type="date"
                        id="date"
                        value={ date }
                        onChange={ ( e ) => setDate( e.target.value ) }
                    />
                </label>
                <label className="time" >Time:</label>
                <input
                    type="time"
                    id="time"
                    value={ time }
                    onChange={ ( e ) => setTime( e.target.value ) }
                />
                {/* { errors.time && <span>This field is required</span> } */ }

                {/* EDIT RESERVATION: */ }
                {/* <label htmlFor="status">Status:</label>
                <select id="status" name="status" ref={ register( { required: true } ) }>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Attended">Attended</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                { errors.status && <span>This field is required</span> } */}

                <label htmlFor="notes">
                    {/* Notes: */ }
                    <input
                        type="text"
                        id="notes"
                        onChange={ ( e ) => setNotes( e.target.value ) }
                        placeholder="Leave a note, if you'd like."
                    />
                </label>
                {/* { errors && <div>{ errors }</div> } */ }

                <button type="submit" onClick={ handleAddPoints } >Create Reservation</button>
                <ul>
                    { errors.map( ( error, idx ) => <li key={ idx }>{ error }</li> ) }
                </ul>

            </form>
        </div>
    );
};

export default ReservationForm
