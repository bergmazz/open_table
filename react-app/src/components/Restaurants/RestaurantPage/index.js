import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getDetailsRestaurant } from "../../../store/restaurantDetails";
import './RestaurantPage.css'

const RestaurantPage = () => {
    const dispatch = useDispatch();

    const restaurant = useSelector(state => state.restaurantDetails)

    const { id } = useParams();

    console.log("idddd", id)

    console.log("1: IN RESTAURANT DETAILS COMPONENT", restaurant);

    useEffect(() => {
        console.log("2: I'm in the useEffect function.")
        dispatch(getDetailsRestaurant(id));
    }, [dispatch]);

    if (Object.keys(restaurant).length) {
        console.log("RESTAURANTAASSSSSSSSSSSSSSS", restaurant)
        return (
            <div className="restaurant-container">

                <div className="restaurant-cover-image">
                        <img style={{ width: "100%", height: "100%"}} src={`${restaurant.coverImage}`} alt="" />
                </div>

                <div className="restaurant-column1">Ï
                    <ul className="restaurant-links">
                            <li className="restaurant-overview-link">
                                <NavLink style={{textDecoration: 'none'}} exact to ="/restaurants/`${restaurant.id}`">Overview</NavLink>
                            </li>
                            <li className="restaurant-review-link">
                                <a style={{textDecoration: 'none'}} id="restaurant-reviews" href="#element_target">Reviews</a>
                            </li>
                    </ul>


                    <div className="restaurant-name">{`${restaurant.restaurantName}`}</div>
                    <div className="random-box">
                        <div className="ratings-average-bar">
                            <meter class="average-rating" min="0" max="5" value={restaurant.averageRating}>{restaurant.averageRating}</meter>
                            <div>{restaurant.averageRating}</div>
                            <div className="review-summary">
                                <i className="fa-regular fa-message" />
                            </div>
                            
                        </div>
                        <div className="top-tags"></div>
                        <div className="restaurant-description"></div>
                    </div>
                    <div id="restaurant-reviews">
                    {
                        restaurant.reviews.map(review => (
                            <p>{`${review.comment}`}</p>
                    ))
                    }
                    </div>
                </div>

                <div className="restaurant-column2">
                    <h2>Make a reservation</h2>
                </div>

            </div>
        )
    } else {
        return (
            <div>Loading....</div>
        )
    }

}

export default RestaurantPage;
