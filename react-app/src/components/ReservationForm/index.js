import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsRestaurant } from "../../store/restaurantDetails";
import { addReservationThunk } from "../../store/reservation"

// DOES NOT WORK YET

const ReservationForm = () => {
    const dispatch = useDispatch();

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
            const data = dispatch( addReservationThunk(
                id, numberOfPeople, reservationTime, status, notes
            ) );
            // console.log( '---------------------', data.error )
            if ( data.error ) {
                // console.log( '---------------------', data.error )
                setErrors( data )
            }
        } else {
            setErrors( [ 'Please create an account' ] );
        }
    };
    // if ( restaurant.slots ) {
    //     console.log( "restaurant slots:", Object.values( restaurant.slots ) )
    // }

    return (
        <div>
            <h1>Reservation Form</h1>
            <form className="reserve" onSubmit={ handleSubmit }>
                <ul>
                    { errors.map( ( error, idx ) => <li key={ idx }>{ error }</li> ) }
                </ul>
                <label className="num">
                    Number of Guests:
                    <input
                        type="number"
                        value={ numberOfPeople }
                        onChange={ ( e ) => setNumberOfPeople( e.target.value ) }
                    />
                </label>
                {/* { errors.numberOfPeople && <span>This field is required</span> } */ }

                <label className="date">Date:
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

<<<<<<< HEAD
                <label htmlFor="notes">Notes:</label>
                <input
                    type="text"
                    id="notes"
                    name="notes"
                    placeholder="optional"
                    ref={ register }
                />

                <button type="submit">Create Reservation</button>
=======
                <label htmlFor="notes">
                    {/* Notes: */ }
                    <input
                        type="text"
                        id="notes"
                        onChange={ ( e ) => setNotes( e.target.value ) }
                        placeholder="Leave a note, if you'd like."
                    />
                </label>
                { errors && <div>{ errors }</div> }

                <button type="submit">Create Reservation</button>

>>>>>>> frontend
            </form>
        </div>
    );
};

export default ReservationForm
