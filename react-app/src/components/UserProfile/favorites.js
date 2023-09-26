import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../store/restaurant";
import { getFavorites } from "../../store/favorite";
import { Link } from "react-router-dom";
import "./favorites.css"


const Favorites = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const restaurants = useSelector(state => state.restaurants);
    const favorites = useSelector(state => state.favorites);

    useEffect(() => {
        dispatch(getRestaurants());
        dispatch(getFavorites(user.id))
    }, [dispatch, user.id])

    if (!user) {
        return <div className='no-user'>
            <h1 className='no-user'>Sorry, you need to log in</h1>
            <Link to="/login"> </Link>
        </div>
    }



    let favRestaurants = [];
    if (Object.values(restaurants).length) {
        for (let i = 0; i < favorites.length; i++) {
            let restaurant = Object.values(restaurants).filter(r => r.id === favorites[i].restaurantId);

            favRestaurants.push(restaurant[0])
        }
    }


    if (user && Object.keys(restaurants) && favorites.length) {
        return (
            <div className="homepage-container">
                <div className="homepage-search">
                    <h1 className="homepage-header">Your favorite restaurants</h1>
                </div>
                <div className="featured-bar">
                    <h2>Favorite restaurants</h2>
                </div>
                <div className="fav-restaurant-cards">
                    {
                        favRestaurants.map(restaurant => (
                            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                                <div className="fav-card-container">
                                    <img className="card-img" src={restaurant.coverImage} alt="restaurant" />
                                    <div className="card-name">{`${restaurant.restaurantName}`}</div>
                                    <div className="card-info">
                                        <div className="card-cuisine">{`${restaurant.cuisineType}`}</div>
                                        <p className="dot">•</p>
                                        <span className="actice-price">{'$'.repeat(restaurant.priceRange)}</span>
                                        <span className="inactive-price">{'$'.repeat(4 - restaurant.priceRange)}</span>
                                        <p className="dot">•</p>
                                        <div className="card-city">{`${restaurant.city}`}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        )
    } else {
        return (<div className="no-fav-restaurants">
            <h1>You have no favorite restaurants</h1>
        </div>
        )
    }

}

export default Favorites;
