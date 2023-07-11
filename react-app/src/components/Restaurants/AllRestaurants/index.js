import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRestaurants, getRestaurants } from "../../../store/restaurant";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./AllRestaurants.css"

const AllRestaurants = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams( location.search );
    const cuisineType = queryParams.get( "type" );
    const city = queryParams.get( "city" );

    const allRestaurants = useSelector(state => state.restaurants)

    const restaurantValues = Object.values(allRestaurants)

    // console.log("1: IN RESTAURANTS COMPONENT", allRestaurants);

    useEffect( () => {
        // Clear existing restaurants before fetching new ones
        dispatch( clearRestaurants() );
        dispatch( getRestaurants( cuisineType, city ) );
    }, [ dispatch, cuisineType, city ] );

    if (restaurantValues.length) {

        // const fullStars = Math.floor(restaurant.averageRating);
        // const starArr = [];

        // for (let i = 1; i <= fullStars; i++) {
        //     starArr.push(1);
        // }

        // if (restaurant.averageRating < 5) {
        //     const partialStar = restaurant.averageRating - fullStars;
        //     starArr.push(partialStar);
        //     const emptyStars = 5 - starArr.length;
        //     for (let i = 1; i <= emptyStars; i++) {
        //         starArr.push(0);
        //     }

        //     function starRating(star) {
        //         if (star === 0) return <i className="fa-regular fa-star" style="color: #d50b1f;"></i>
        //         else if (star < 1) return <i className="fa-solid fa-star-half-stroke" style="color: #d50b1f;"></i>
        //         else return <i className="fa-solid fa-star" style="color: #d50b1f;"></i>
        //     }
        // }


        return (
            <div>
                {
                    cuisineType && city && <div>Results for "{cuisineType}" restaurants in {city}</div>
                }
                <div className="restaurants-results-container">

                {
                    restaurantValues.map(restaurant => (
                        <>
                        <div className="restaurant-results" key={ restaurant.id }>
                            <div className="all-res-image-container">

                            <img className="all-res-image" src={restaurant.coverImage} alt="restaurant" height="50px"/>
                            </div>
                            <div className="all-res-info">
                                <div className="res-name">{restaurant.restaurantName}</div>
                                <div className="res-stars">
                                <span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
                                </div>
                                <div className="res-price">$$$$</div>
                                <div className="res-times">
                                    6:30
                                </div>
                            </div>

                        </div>
                        </>
                    ))
                }
                </div>
            </div>
        )
    } else {
        return null;
    }

}

export default AllRestaurants;
