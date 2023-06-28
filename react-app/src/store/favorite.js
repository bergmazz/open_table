
// Action Types
const GET_FAVORITE = 'favorite/GET_FAVORITE';
const ADD_FAVORITE = 'favorite/ADD_FAVORITE';
const DELETE_FAVORITE = 'favorite/DELETE_FAVORITE';

// Action Creators
export const getFavorite = (favorite) => ({
    type: GET_FAVORITE,
    payload: favorite
});

export const addFavorite = (newFavorite) => ({
    type: ADD_FAVORITE,
    payload: newFavorite
});

export const deleteFavorite = (favoriteId) => ({
    type: DELETE_FAVORITE,
    payload: favoriteId
})

// Thunks
export const getFavorites = (userId) => async (dispatch) => {
    const response = await fetch('/api/user/${userId}/favorites', {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        const favorites = await response.json();
        dispatch(getFavorite(favorites));
        return favorites;
    }
}

export const addFavorites = (userId, restaurantId) => async (dispatch) => {
    const response = await fetch('/api/user/${userId}/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, restaurantId })
    });

    if (response.ok) {
        const newFavorite = await response.json();
        dispatch(addFavorite(newFavorite));
        return newFavorite;
    }
}

export const deleteFavorites = (id, userId) => async (dispatch) => {
    const response = await fetch('/api/user/${userId}/favorites/${id}', {
        method: 'DELETE',
    });

    dispatch(deleteFavorite(id));
    return response;
}

const initialState = {};

// Reducer
const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAVORITE: {
            const newState = { ...state };
            action.payload.forEach((favorite) => {
                newState[favorite.id] = favorite;
            });
            return newState;
        }
        case ADD_FAVORITE: {
            return {
                ...state,
                [action.payload.id]: action.payload
            };
        }
        case DELETE_FAVORITE: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        default:
            return state;
    }
}

export default favoriteReducer;
