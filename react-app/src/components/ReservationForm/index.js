import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsRestaurant } from "../../store/restaurantDetails";
import { addReservationThunk } from "../../store/reservation"
// DOES NOT WORK YET
const ReservationForm = () => {
    const dispatch = useDispatch();

    const [ numberOfPeople, setNumberOfPeople ] = useState( "" );
    const [ reservationTime, setReservationTime ] = useState( "" );
    const [ date, setDate ] = useState( "" );
    const [ time, setTime ] = useState( "" );
    const [ status, setStatus ] = useState( "confirmed" );
    const [ notes, setNotes ] = useState( "" );

    const [ errors, setErrors ] = useState( [] );

    const { id } = useParams();
    useEffect( () => {
        dispatch( getDetailsRestaurant( id ) );
    }, [ dispatch ] );

    const currentUser = useSelector( state => state.session.user )
    const restaurant = useSelector( state => state.session.restaurantDetails )
    // const times = restaurant.slots

    if ( !currentUser ) return <Redirect to="/signup" />;

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        if ( currentUser ) {
            setReservationTime( new Date( `${ date }T${ time }` ).toISOString() )
            const data = dispatch( addReservationThunk(
                numberOfPeople, reservationTime, status, notes
            ) );
            if ( data.errors ) {
                setErrors( data )
            }

        } else {
            setErrors( [ 'Please create an account' ] );
        }
    };

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
                { errors.numberOfPeople && <span>This field is required</span> }

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
                { errors.reservationTime && <span>This field is required</span> }

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

                <button type="submit">Create Reservation</button>

            </form>
        </div>
    );
};

export default ReservationForm
