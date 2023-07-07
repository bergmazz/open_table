import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../store/restaurant";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";

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
    const selectedRestaurants = shuffledRestaurants.slice(0, 5)
    // console.log("RANDOM, ", selectedRestaurants)
    
    
    useEffect(() => {
        dispatch(getRestaurants(cuisineType, city));
    }, [dispatch, cuisineType, city])

    console.log("1: IN RESTAURANTS COMPONENT", allRestaurants);



    return (
        <div className="homepage-container">
            <h1>Discover a table for every event</h1>
            <div className="reservation-search">
                <SearchBar />
            </div>
            <div>
                <h2>Featured restaurants</h2>
                {
                    selectedRestaurants.map(restaurant => (
                    <div className="card-container" key={restaurant.id}>
                        <img className="card-img" src={restaurant.coverImage} alt="restaurant" />
                        <div className="card-name">{ `${ restaurant.restaurantName }` }</div>
                        <div className="card-cuisine">{ `${ restaurant.cuisineType }` }</div>
                        <div className="card-price">{ `${ restaurant.priceRange }` }</div>
                    </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage;
