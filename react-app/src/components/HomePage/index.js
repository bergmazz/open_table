import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../store/restaurant";
import { useLocation, Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import "./HomePage.css"

const HomePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cuisineType = queryParams.get("type");
    const city = queryParams.get("city");

    const allRestaurants = useSelector(state => state.restaurants)
    const restaurantValues = Object.values(allRestaurants)

    function shuffle(restaurantValues) {
        let currentIndex = restaurantValues.length, temporaryValue, randomIndex;
    
        while (0 !== currentIndex) {
    
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    

            temporaryValue = restaurantValues[currentIndex];
            restaurantValues[currentIndex] = restaurantValues[randomIndex];
            restaurantValues[randomIndex] = temporaryValue;
        }
        return restaurantValues;
    }

    const shuffledRestaurants = shuffle(restaurantValues)
    const selectedRestaurants = shuffledRestaurants.slice(0, 8)
    // console.log("RANDOM, ", selectedRestaurants)
    
    
    useEffect(() => {
        dispatch(getRestaurants(cuisineType, city));
    }, [dispatch, cuisineType, city])

    console.log("1: IN RESTAURANTS COMPONENT", allRestaurants);



    return (
        <div className="homepage-container">
            <div className="homepage-search">
            <h1>Discover a table for every event</h1>
            {/* <img className="homepage-img" src="https://assets.bonappetit.com/photos/62f40c3d43365e834b4d2813/16:9/w_2992,h_1683,c_limit/0810-dimes-square-lede.jpg" alt="dining" /> */}
            <div className="reservation-search">
                <SearchBar />
            </div>
            </div>
                <h2>Featured restaurants</h2>
            <div className="restaurant-cards">
                {
                    selectedRestaurants.map(restaurant => (
                        <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                    <div className="card-container">
                        <img className="card-img" src={restaurant.coverImage} alt="restaurant" />
                        <div className="card-name">{ `${ restaurant.restaurantName }` }</div>
                        <div className="card-cuisine">{ `${ restaurant.cuisineType }` }</div>
                        <div className="card-price">{ '$'.repeat(restaurant.priceRange) }</div>
                    </div>
                    </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage;
