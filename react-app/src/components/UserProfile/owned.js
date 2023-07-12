import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants, deleteRestaurants } from '../../store/restaurant';
import { Link } from 'react-router-dom';


const OwnerRestaurant = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const allRestaurants = useSelector(state => state.restaurants);
    const restaurantValues = Object.values(allRestaurants)

    useEffect(() => {
        dispatch(getRestaurants());
    }, [dispatch])

    if (!allRestaurants || !user) return null;

    const myRestaurants = restaurantValues.filter(restaurant => restaurant.userId == user.id);

    console.log("hello", myRestaurants)
    
    const handleDelete = (restaurantId) => {
        dispatch(deleteRestaurants(restaurantId))
    }

    if (myRestaurants.length === 0) return (
        <div>
            <h1>You have no restaurants</h1>
            <Link to="/new-restaurant">
                <button>Create a restaurant</button>
            </Link>
        </div>
    )

    return (
        <div>
            <h1>My Restaurants</h1>
            {myRestaurants.map(restaurant => (
                <div className="card-container">
                <img className="card-img" src={restaurant.coverImage} alt="restaurant" />
                <div className="card-name">{ `${ restaurant.restaurantName }` }</div>
                <div className="card-info">
                <div className="card-cuisine">{ `${ restaurant.cuisineType }` }</div>
                <p className="dot">•</p>
                <span className="actice-price">{ '$'.repeat(restaurant.priceRange) }</span>
                <span className="inactive-price">{ '$'.repeat(4 - restaurant.priceRange) }</span>
                <p className="dot">•</p>
                <div className="card-city">{ `${ restaurant.city }` }</div>
                </div>
                <button onClick={() => handleDelete(restaurant.id)}>Delete Restaurant</button>
            </div>
            ))}
            <Link to="/new-restaurant">
                <button>Create a restaurant</button>
            </Link>
        </div>
    )
}

export default OwnerRestaurant;
