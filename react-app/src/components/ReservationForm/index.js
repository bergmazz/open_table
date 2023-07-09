import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { addReservation } from "../../store/reservation"

const ReservationForm = ( { selectedRestaurant, selectedDate, selectedTime, selectedNumber = 2 } ) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const currentUser = useSelector( state => state.session.user )

    const onSubmit = ( data ) => {
        dispatch( addReservation( data ) );
    };

    return (
        <div>
            <h1>Reservation Form</h1>
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <label htmlFor="number_of_people">Number of People:</label>
                <input
                    type="number"
                    id="number_of_people"
                    name="number_of_people"
                    ref={ register( { required: true } ) }
                />
                { errors.number_of_people && <span>This field is required</span> }

                <label htmlFor="reservation_time">Reservation Time:</label>
                <input
                    type="datetime-local"
                    id="reservation_time"
                    name="reservation_time"
                    ref={ register( { required: true } ) }
                />
                { errors.reservation_time && <span>This field is required</span> }

                {/* <label htmlFor="status">Status:</label>
                <select id="status" name="status" ref={ register( { required: true } ) }>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Attended">Attended</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                { errors.status && <span>This field is required</span> } */}

                <label htmlFor="notes">Notes:</label>
                <input
                    type="text"
                    id="notes"
                    name="notes"
                    placeholder="optional"
                    ref={ register }
                />

                <button type="submit">Create Reservation</button>
            </form>
        </div>
    );
};

export default ReservationForm
