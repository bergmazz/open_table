
//Action Types
const GET_RESTAURANT = 'restaurant/GET_RESTAURANT';
const ADD_RESTAURANT = 'restaurant/ADD_RESTAURANT';
const DELETE_RESTAURANT = 'restaurant/DELETE_RESTAURANT';

//Action Creators
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

//Thunks
export const getRestaurants = () => async (dispatch) => {
    const response = await fetch('/api/restaurants', {
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
