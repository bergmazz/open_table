
//Action Types
const GET_RESTAURANT = 'restaurant/GET_RESTAURANT';
const ADD_RESTAURANT = 'restaurant/ADD_RESTAURANT';
const DELETE_RESTAURANT = 'restaurant/DELETE_RESTAURANT';
const GET_RESTAURANT_DETAILS = 'restaurant/GET_RESTAURANT_DETAILS'

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
})

export const getRestaurantDetails = (restaurantId) => ({
    type: GET_RESTAURANT_DETAILS,
    restaurantId
})


//Thunks
export const getRestaurants = (type, city) => async (dispatch) => {
    let url = '/api/restaurants';
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
        console.log("5: I'm in the right thunk, response ok: ", )
        const restaurants = await response.json();
        console.log("RESTAURANTTTTTTTS:======= ",restaurants)
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

    const response = await fetch('/api/restaurants', {
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
    const response = await fetch('/api/restaurants/${restaurantId}', {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteRestaurant(restaurantId));
        return response;
    }
}

export const getDetailsRestaurant = (restaurantId) => async (dispatch) => {
    const response = await fetch('/api/restaurants/${restaurantId}', {
        method: 'GET',
    });

    if (response.ok) {
        dispatch(getRestaurantDetails(restaurantId));
        return response;
    }
}



// Reducer
const initialState = {};

const restaurantReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RESTAURANT:
            newState = { ...state };
            console.log("GETTTTTTTRESTTTTTAURANTTTT STATE-------", action.restaurants)

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
        case GET_RESTAURANT_DETAILS:
            newState = {...state};
            newState.restaurantDetails = action.restaurantId
            return newState;
        default:
            return state;

    }
}

export default restaurantReducer;
