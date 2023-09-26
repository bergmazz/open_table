
//Action Types
const GET_RESTAURANT = 'restaurant/GET_RESTAURANT';
const ADD_RESTAURANT = 'restaurant/ADD_RESTAURANT';
const DELETE_RESTAURANT = 'restaurant/DELETE_RESTAURANT';
const CLEAR_RESTAURANTS = 'restaurant/CLEAR_RESTAURANTS';

//Action Creators
//RESTAURANTS
export const getRestaurant = (restaurants) => ({
    type: GET_RESTAURANT,
    restaurants
});

export const addRestaurant = (newRestaurant) => ({
    type: ADD_RESTAURANT,
    newRestaurant
});

export const deleteRestaurant = (restaurantId) => ({
    type: DELETE_RESTAURANT,
    restaurantId
} )

export const clear = () => ( {
    type: CLEAR_RESTAURANTS
} );

//Thunks
export const clearRestaurants = () => ( dispatch ) => {
    dispatch( clear() );
};

export const getRestaurants = (type, city) => async (dispatch) => {
    let url = '/api/restaurants/';
    const params = new URLSearchParams();

    if (type) params.append('type', type);
    if (city) params.append('city', city);

    if (params.toString()) {
        url += '?' + params.toString();
    }


    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {

        const restaurants = await response.json();

        dispatch(getRestaurant(restaurants));
        return restaurants;
    }
}

export const addRestaurants = (restaurant) => async (dispatch) => {
    const {
        user_id,
        restaurant_name,
        cover_image,
        email,
        address,
        city,
        state,
        zip_code,
        country,
        cuisine_type,
        price_range,
        phone_number,
        open_hours,
        closing_hours,
    } = restaurant;

    const response = await fetch('/api/restaurants/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id,
            restaurant_name,
            cover_image,
            email,
            address,
            city,
            state,
            zip_code,
            country,
            cuisine_type,
            price_range,
            phone_number,
            open_hours,
            closing_hours,
        })
    });

    if (response.ok) {
        const newRestaurant = await response.json();
        dispatch(addRestaurant(newRestaurant));
        return newRestaurant;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            const errorData = await response.json()
            return errorData.errors;
        } else {
            return ["An error occurred. Please try again."];
        }
    }
}

export const deleteRestaurants = (restaurantId) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteRestaurant(restaurantId));
        return response;
    }
}


// Reducer
const initialState = {};

const restaurantReducer = (state = initialState, action) => {
    let newState;
    switch ( action.type ) {

        case CLEAR_RESTAURANTS:
            return {
                ...initialState
            };

        case GET_RESTAURANT:
            newState = { ...state };
            // console.log("GETTTTTTTRESTTTTTAURANTTTT STATE-------", action.restaurants)
            action.restaurants.restaurants.forEach(restaurant => {
                newState[restaurant.id] = restaurant;
            });
            return newState;
        case ADD_RESTAURANT:
            newState = {
                ...state,
                [action.newRestaurant.id]: action.newRestaurant
            };
            return newState;
        case DELETE_RESTAURANT:
            newState = { ...state };
            delete newState[action.restaurantId];
            return newState;
        default:
            return state;

    }
}

export default restaurantReducer;
