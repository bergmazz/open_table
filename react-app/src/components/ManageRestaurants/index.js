import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants, deleteRestaurants } from '../../store/restaurant';
import DeleteRestaurantModal from '../Restaurants/DeleteRestaurant';
import { Link, useHistory } from 'react-router-dom';
import './ManageRestaurants.css'


const OwnerRestaurant = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [restaurantToDelete, setRestaurantToDelete] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
        setRestaurantToDelete(restaurantId);
        setDeleteModalOpen(true);
    }

    const handleDeleteConfirm = () => {
        if (restaurantToDelete) {
            dispatch(deleteRestaurants(restaurantToDelete));
            setRestaurantToDelete(null);
        }
        setDeleteModalOpen(false);
        history.push('/user/restaurants');
    }

    const handleDeleteCancel = () => {
        setRestaurantToDelete(null);
        setDeleteModalOpen(false);
    }

    if (myRestaurants.length === 0) return (
        <div className='no-restaurant-container'>
            <h1 className='no-restaurant-header'>You own no restaurants</h1>
            <Link to="/new-restaurant">
                <button className='no-restaurant-button'>Create a restaurant</button>
            </Link>
        </div>
    )

    return (
        <div className='manage-restaurants'>
    <h1 className='manage-header'>My Restaurants</h1>
    <div className='manage-cards'>
    {myRestaurants.map(restaurant => (
        <div key={restaurant.id}>
            <Link to={`/restaurants/${restaurant.id}`}>
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
                </div>
            </Link>
            <div className='manage-restaurant-button-container'>
            <button className='manage-restaurant-button' onClick={() => handleDelete(restaurant.id)}>Delete Restaurant</button>
            </div>
        </div>
    ))}
    </div>
    {deleteModalOpen && (
        <DeleteRestaurantModal
            isOpen={deleteModalOpen}
            onDelete={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
            onClose={() => setDeleteModalOpen(false)}
        />
    )}
    <div className='create-restaurant'>
        <Link to="/new-restaurant">
            <button className='create-restaurant-button'>Add your restaurant</button>
        </Link>
    </div>
</div>
    )
}

export default OwnerRestaurant;


