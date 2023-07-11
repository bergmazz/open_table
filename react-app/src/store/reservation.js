const GET_USER_RESERVATIONS = 'reservations/GET_USER_RESERVATIONS'
const GET_RESTAURANT_RESERVATIONS = 'reservations/GET_RESTAURANT_RESERVATIONS'
const ADD_RESERVATIONS = 'reservations/ADD_RESERVATIONS'
const EDIT_RESERVATIONS = 'reservations/EDIT_RESERVATIONS'
const DELETE_RESERVATIONS = 'reservations/DELETE_RESERVATIONS'


// ------------------------------------------------- ACTIONS

export const getUserReservation = (reservations) => {
    reservations = Object.values( reservations )
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

export const addReservation = ( restaurantId, newReservation ) => {
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

// ----------------------------------------------------- THUNKS

export const getUserReservations = () => async (dispatch) => {
    const res = await fetch(`/api/user/reservations`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const reservation = await res.json();

        dispatch( getUserReservation( reservation ) );
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

export const addReservationThunk = ( restaurant_id, number_of_people, reservation_time, status = "Confirmed", notes ) => async ( dispatch ) => {
    const reservationData = {
        number_of_people, reservation_time, status, notes
    }
    console.log( "thunk reservation data:", reservationData )
    const res = await fetch( `/api/restaurants/${ restaurant_id }/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            number_of_people, reservation_time, status, notes
        })
    } );
    // console.log( "res:", res )
    if (res.ok) {
        const reservation = await res.json();
        dispatch( addReservation( restaurant_id, reservationData ) );
        return reservation
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            const errorData = await res.json()
            return errorData.errors
        } else {
            return ['An error occured. Please try again.']
        }
    }
}

export const editReservations = (restaurantId, reservationId, reservation) => async (dispatch) => {
    const {
        number_of_people,
        reservation_time,
        status,
        notes
    } = reservation

    const res = await fetch(`/api/restaurants/${restaurantId}/reservations/${reservationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            number_of_people,
            reservation_time,
            status,
            notes
        })
    });

    if (res.ok) {
        const reservation = await res.json();
        dispatch(editReservation(reservation));
        return reservation
    } else if (res.status < 500) {
        const data = await res.json()
        if ( data.error ) {
            const errorData = await res.json()
            return errorData.errors
        } else {
            return ['An error occured. Please try again.']
        }
    }
}

export const deleteReservations = (restaurantId, reservationId) => async (dispatch) => {
    const res = await fetch(`api/restaurants/${restaurantId}/reservations/${reservationId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const deletedReservation = await res.json();
        dispatch(deleteReservation(reservationId))
        return deletedReservation
    }
}

// ------------------------------------------------------------------------------ REDUCER

const initialState = {
    byUser: [],
    byRestaurant: {}
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
            newState.byRestaurant[ action.restaurantId ] = action.reservations;
            return newState;
        }
        case ADD_RESERVATIONS: {
            newState = { ...state };
            newState.byRestaurant[ action.restaurantId ] = {
                ...newState.byRestaurant[ action.restaurantId ],
                [ action.newReservation.id ]: action.newReservation,
            };
            return newState;
        }
        case EDIT_RESERVATIONS: {
            newState = { ...state }
            newState.byRestaurant[ action.restaurantId ] = newState.byRestaurant[
                action.restaurantId
            ].map((reservation) => reservation.id === action.newReservation.id ? action.newReservation : reservation);
            return newState;
        }
        case DELETE_RESERVATIONS: {
            newState = { ...state }
            newState.byRestaurant[ action.restaurantId ] = newState.byRestaurant[
                action.restaurantId
            ].filter((reservation) => reservation.id !== action.reservationId);
            return newState;
        }
        default:
            return state
    }
}
