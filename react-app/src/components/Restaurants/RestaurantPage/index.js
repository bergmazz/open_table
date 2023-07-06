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
        let reviews = "Reviews"
        if (restaurant.reviews.length === 1) reviews = "Review"
        let priceRange = "$50 and over"
        if (restaurant.priceRange <= 2) priceRange = "$30 and under";
        if (restaurant.priceRange === 3) priceRange = "$31 to $50";
        const description = "Whether you’re chatting over a flavorful roasted chicken salad or sipping a merlot as your hand-cut blackened ribeye is mesquite grilled over a live fire, Paul Martin’s American Grill is the ideal place to impress or decompress.";
        return (
            <div className="outer-restaurant-container">
                <div className="restaurant-container">

                    <div className="restaurant-cover-image">
                        <img className="restaurant-image-cover" src={`${restaurant.coverImage}`} alt="" />
                    </div>

                    <div className="restaurant-column1">Ï
                        <ul className="restaurant-links">
                            <li className="restaurant-overview-link">
                                <a href="#top">Overview</a>
                            </li>
                            <li className="restaurant-review-link">
                                <a href="#restaurant-reviews">Reviews</a>
                            </li>
                        </ul>

                        <div id="top" className="restaurant-name">{`${restaurant.restaurantName}`}</div>
                        <div className="random-box">
                            <div className="ratings-average-bar">
                                <div className="ratings">
                                    <meter class="average-rating" min="0" max="5" value={restaurant.averageRating}></meter>
                                    <span className="number-rating">{restaurant.averageRating}</span>
                                </div>
                                <div className="review-summary">
                                    <i className="fa-regular fa-message"></i>
                                    <span>  {restaurant.reviews.length} {reviews}</span>
                                </div>
                                <div className="money">
                                    <i class="fa-sharp fa-regular fa-money-bill-1"></i> {priceRange}
                                </div>
                                <div className="cuisine-type"><i class="fa-solid fa-utensils"></i> {restaurant.cuisineType}</div>

                            </div>
                            {/* <div className="top-tags"></div>
                            <div className="restaurant-description">{description}</div> */}
                        </div>
                        <div id="restaurant-reviews">
                            <div className="reviews-bar">
                                <div className="total-restaurant-reviews">{restaurant.reviews.length} {reviews}</div>
                                <div className="sort-reviews">Newest</div>
                            </div>
                            <div className="reviews-area">
                            {
                                restaurant.reviews.map(review => (
                                    <div className="individual-review">
                                        <div className="user-section">User</div>
                                        <div className="review-section">
                                        {review.comment}
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>

                    <div className="restaurant-column2">
                        <div className="reservation-box">
                            <div className="make-res">Make a reservation</div>
                            <div className="party-size">Party Size</div>
                            <div className="party-select">2 people</div>
                            <div className="res-time">date time</div>
                            <div className="find-time">find time</div>
                            <div className="times-booked">Booked 11 times today</div>
                        </div>
                        <div className="delivery-box">Delivery</div>
                        <div className="map-container">Map</div>
                        <div className="restaurant-details-box">Details</div>
                    </div>

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
