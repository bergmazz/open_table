import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import favoriteReducer from './favorite';
import restaurantReducer from './restaurant';
import restaurantDetailsReducer from './restaurantDetails';
import reservationsReducer from './reservation';
import reviewReducer from './review';

const rootReducer = combineReducers({
  session,
  favorites: favoriteReducer,
  restaurants: restaurantReducer,
  restaurantDetails: restaurantDetailsReducer,
  reservations: reservationsReducer,
  reviews: reviewReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
