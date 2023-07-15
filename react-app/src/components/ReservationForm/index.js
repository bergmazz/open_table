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
    currentTime.setHours( currentTime.getUTCHours() + 1 );
    currentTime.setMinutes( Math.ceil( currentTime.getUTCMinutes() / 30 ) * 30 ); // Round up to next 30-minute increment
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
    const [ status, setStatus ] = useState( "confirmed" );
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
            const utcDateTime = dateObject.toISOString();
            console.log( "UTC:", utcDateTime )
            const year = dateObject.getFullYear();
            const month = `0${ dateObject.getMonth() + 1 }`.slice( -2 ); // Months are zero-indexed, so add 1
            const day = `0${ dateObject.getDate() }`.slice( -2 );
            const hours = `0${ dateObject.getHours() }`.slice( -2 );
            const minutes = `0${ dateObject.getMinutes() }`.slice( -2 );
            const seconds = `0${ dateObject.getSeconds() }`.slice( -2 );
            setReservationTime( `${ year }-${ month }-${ day } ${ hours }:${ minutes }:${ seconds }` )
            // setReservationTime( `${ date } ${ time }` )

            // const dateObject = new Date( `${ date }T${ time }` );
            // const utcDateTime = dateObject.toISOString();
            // console.log( "UTC:", utcDateTime )
            // setReservationTime( utcDateTime );
        }
    }, [ date, time ] )

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
            // if ( !currentUser ) return <Redirect to="/signup" />;
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
                <div className="party-size">Party Size</div>
                <label >
                    <input
                        className="party-select"
                        type="number"
                        value={ numberOfPeople }
                        onChange={ ( e ) => setNumberOfPeople( e.target.value ) }
                    />
                </label>
                {/* { errors.numberOfPeople && <span>This field is required</span> } */ }

                <div className="date-time">Date and Time</div>
                <label className="date">
                    {/* <i className="fas fa-calendar"></i> */ }
                    <input
                        className="date"
                        type="date"
                        id="date"
                        value={ date }
                        onChange={ ( e ) => setDate( e.target.value ) }
                    />
                </label>
                <label >
                <input
                        className="time"
                    type="time"
                    id="time"
                    value={ time }
                    onChange={ ( e ) => setTime( e.target.value ) }
                    />
                </label>

                <label >
                    {/* Notes: */ }
                    <input
                        className="notes"
                        type="text"
                        id="notes"
                        onChange={ ( e ) => setNotes( e.target.value ) }
                        placeholder="Leave a note, if you'd like."
                    />
                </label>

                <button className="book" type="submit" onClick={ handleAddPoints } >Book Table</button>
                <ul>
                    { errors.map( ( error, idx ) => <li key={ idx }>{ error }</li> ) }
                </ul>

            </form>
        </div>
    );
};

export default ReservationForm
