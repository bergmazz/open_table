const GET_USER_RESERVATIONS = 'reservations/GET_USER_RESERVATIONS'
const GET_RESTAURANT_RESERVATIONS = 'reservations/GET_RESTAURANT_RESERVATIONS'
const ADD_RESERVATIONS = 'reservations/ADD_RESERVATIONS'
const EDIT_RESERVATIONS = 'reservations/EDIT_RESERVATIONS'
const DELETE_RESERVATIONS = 'reservations/DELETE_RESERVATIONS'
const UPDATE_POINTS = 'reservations/UPDATE_POINTS';

// ------------------------------------------------- ACTIONS

export const getUserReservation = (reservations) => {
    reservations = Object.values(reservations)
    return {
        type: GET_USER_RESERVATIONS,
        reservations
    }
}

export const getRestaurantReservation = (restaurantId, reservations) => {
    return {
        type: GET_RESTAURANT_RESERVATIONS,
        restaurantId,
        reservations
    }
}

export const addReservation = (restaurantId, newReservation) => {
    return {
        type: ADD_RESERVATIONS,
        restaurantId,
        newReservation
    }
}

export const editReservation = (restaurantId, newReservation) => {
    return {
        type: EDIT_RESERVATIONS,
        restaurantId,
        newReservation
    }
}


export const deleteReservation = (reservationId) => {
    return {
        type: DELETE_RESERVATIONS,
        reservationId
    }
}

export const updatePoints = (points) => {
    return {
        type: UPDATE_POINTS,
        points
    };
};

// ----------------------------------------------------- THUNKS

export const getUserReservations = () => async (dispatch) => {
    const res = await fetch(`/api/user/reservations`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const reservation = await res.json();

        dispatch(getUserReservation(reservation));
        return reservation;
    }
}

export const getRestaurantReservations = (restaurantId) => async (dispatch) => {
    const res = await fetch(`/api/restaurant/${restaurantId}/reservations/`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const reservation = await res.json();
        dispatch(getRestaurantReservation(restaurantId, reservation));
        return reservation;
    }
}

export const addReservationThunk = (restaurant_id, number_of_people, reservation_time, status = "Confirmed", notes) => async (dispatch) => {
    const reservationData = {
        number_of_people, reservation_time, status, notes
    }

    // ( "thunk reservation data:", reservationData )
    const res = await fetch(`/api/restaurants/${restaurant_id}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            number_of_people, reservation_time, status, notes
        })
    });
    // ( "res:", res )
    if (res.ok) {
        const reservation = await res.json();
        dispatch(addReservation(restaurant_id, reservationData));
        dispatch(updatePoints(100));
        return reservation
    } else {
        const data = await res.json();
        return Object.values(data)
        // ( "data:", data )

        // if ( data.errors ) {
        //     const errorData = await res.json()
        //     return errorData.errors
        // }
        // else {
        //     return ['An error occured. Please try again.']
        // }

    }
}

export const editReservations = (restaurantId, id, number_of_people,
    reservation_time, status, notes) => async (dispatch) => {

        ("json1:", JSON.stringify({
            number_of_people,
            reservation_time,
            status,
            notes
        }))
        // ( "res length1:", reservation_time.length )
        if (reservation_time.length > 19) {
            reservation_time = reservation_time.slice(0, -3)
        }
        // ( "res length2:", reservation_time.length )
        // ( "json2:", JSON.stringify( {
        //     number_of_people,
        //     reservation_time,
        //     status,
        //     notes
        // } ) )
        const res = await fetch(`/api/restaurants/${restaurantId}/reservations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:

                JSON.stringify( {
                number_of_people,
                reservation_time,
                status,
                notes
            } )
        } );


        if ( res.ok ) {
            const reservation = await res.json();

            dispatch( editReservation( restaurantId, reservation ) );

            // dispatch( getUserReservation( reservation ) );
            return reservation
        } else {
            const data = await res.json();


            return Object.values( data )

        }

    }

export const deleteReservations = (reservationId, restaurantId) => async (dispatch) => {
    const res = await fetch(`api/restaurants/${restaurantId}/reservations/${reservationId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const deletedReservation = await res.json();
        dispatch(getUserReservations())
        // dispatch(deleteReservation(reservationId))
        return deletedReservation;
    }
}

// ------------------------------------------------------------------------------ REDUCER

const initialState = {
    byUser: [],
    byRestaurant: {},
    points: 0
}
export default function reservationsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case GET_USER_RESERVATIONS: {
            return {
                ...state,
                byUser: action.reservations,
            }
        }
        case GET_RESTAURANT_RESERVATIONS: {
            newState = { ...state }
            newState.byRestaurant[action.restaurantId] = action.reservations;
            return newState;
        }
        case ADD_RESERVATIONS: {
            newState = { ...state };
            newState.byRestaurant[action.restaurantId] = {
                ...newState.byRestaurant[action.restaurantId],
                [action.newReservation.id]: action.newReservation,
            };
            return newState;
        }
        case EDIT_RESERVATIONS: {
            // newState = { ...state }
            // newState.byRestaurant[ action.restaurantId ] = newState.byRestaurant[
            //     action.restaurantId
            // ].map((reservation) => reservation.id === action.newReservation.id ? action.newReservation : reservation);
            // return newState;
            newState = { ...state };
            newState.byRestaurant[action.restaurantId] = {
                ...newState.byRestaurant[action.restaurantId],
                [action.newReservation.id]: action.newReservation,
            }
            return newState;
        }
        case DELETE_RESERVATIONS: {
            newState = { ...state }

            newState.byRestaurant[ action.restaurantId ] = newState.byRestaurant[

                action.restaurantId
            ].filter((reservation) => reservation.id !== action.reservationId);
            return newState;
        }
        case UPDATE_POINTS: {
            return {
                ...state,
                points: action.points
            };
        }
        default:
            return state
    }
}
