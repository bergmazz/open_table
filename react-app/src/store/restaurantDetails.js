const GET_RESTAURANT_DETAILS = 'restaurant/GET_RESTAURANT_DETAILS'

export const getRestaurantDetails = (restaurant) => ({
    type: GET_RESTAURANT_DETAILS,
    restaurant
})

export const getDetailsRestaurant = (restaurantId) => async (dispatch) => {
    const response = await fetch(`/api/restaurants/${restaurantId}`);
    if (response.ok) {
        const restaurant = await response.json();
        dispatch(getRestaurantDetails(restaurant));
        return response;
    }
}

const initialState = {};

const restaurantDetailsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_RESTAURANT_DETAILS:
            newState = {...state};
            newState.restaurantDetails = action.restaurant
            return newState;
        default:
            return state;
    }
}

export default restaurantDetailsReducer;
