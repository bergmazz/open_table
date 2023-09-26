import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRestaurants, getRestaurants } from "../../../store/restaurant";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./AllRestaurants.css"
import HomePage from "../../HomePage";

const AllRestaurants = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const cuisineType = queryParams.get("type");
    const city = queryParams.get("city");

    const allRestaurants = useSelector(state => state.restaurants)

    const restaurantValues = Object.values(allRestaurants)

    useEffect(() => {
        // Clear existing restaurants before fetching new ones
        dispatch(clearRestaurants());
        dispatch(getRestaurants(cuisineType, city));
    }, [dispatch, cuisineType, city]);

    if (restaurantValues.length) {
        ("RESTAURABT--------", restaurantValues)

            ;

        function starRating(averageRating) {
            let fullStars = Math.floor(averageRating);
            let starArr = [];

            for (let i = 1; i <= fullStars; i++) {
                starArr.push(1);
            }
            if (averageRating < 5) {
                let partialStar = averageRating - fullStars;
                starArr.push(partialStar);
                let emptyStars = 5 - starArr.length;
                for (let i = 1; i <= emptyStars; i++) {
                    starArr.push(0);
                }
            }
            return starArr;
        }


        return (
            <div className="restaurants-outer">
                {
                    cuisineType && city && <div>Results for "{cuisineType}" restaurants in {city}</div>
                }
                <div className="restaurants-results-container">

                    {
                        restaurantValues.map((restaurant, i) => (

                            <div className="restaurant-results" key={i}>
                                <div className="all-res-image-container">
                                    <a href={`/restaurants/${restaurant.id}`}>
                                        <img className="all-res-image" src={restaurant.coverImage} alt="restaurant" height="50px" />
                                    </a>
                                </div>
                                <div className="all-res-info">
                                    <Link className="res-name" to={`/restaurants/${restaurant.id}`}>{restaurant.restaurantName}</Link>
                                    <div className="res-stars" style={{ color: "#edbe21", }}>
                                        {

                                            starRating(restaurant.averageRating).map((star, j) => {
                                                if (star === 0) return <i className="fa-regular fa-star" key={`star${j}-1`}></i>
                                                else if (star < 1) return <i className="fa-solid fa-star-half-stroke" key={`star${j}-2`}></i>
                                                else return <i className="fa-solid fa-star" key={`star${j}-3`}></i>
                                            })
                                        }
                                    </div>
                                    <div className="res-price">
                                        {
                                            [...Array(restaurant.priceRange)].map((p, i) => <span className="price-dollar" key={i}>$</span>)
                                        }
                                        <span className="dot"> •  {restaurant.cuisineType} • {restaurant.city}</span>
                                    </div>
                                    <div className="res-times">

                                    </div>
                                </div>

                            </div>

                        ))
                    }
                </div>
            </div>
        )
    } else {
        return (
            <>
                <div className="no-luck">Unfortunately, we have no matches for your request. Please try again...</div>
                <HomePage />
            </>);
    }

}

export default AllRestaurants;
