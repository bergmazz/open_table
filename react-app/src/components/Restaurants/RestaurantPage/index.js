import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

        const fullStars = Math.floor(restaurant.averageRating);
        // Gets the number of full stars. starAverage is the rating, for example
        // if the rating were 4.3, fullStars would now be 4.

        const starArr = [];
        // Create an empty array. We will add 1s, 0s, and a decimal value for the
        // partial star.

        for (let i = 1; i <= fullStars; i++) {
            starArr.push(1);
        }
        // This adds a 1 to the array for each full star in our rating

        if (restaurant.averageRating < 5) {
            // Wrapped in an if block because the following only needs to occur if
            // it's not a full 5.

            const partialStar = restaurant.averageRating - fullStars;
            // Calculates the partial star. For example 4.3 - 4 = 0.3. 0.3 will get
            // added to the array in the next line to represent the partial star

            starArr.push(partialStar);
            // Adds the partial star to the array

            const emptyStars = 5 - starArr.length;
            // Calculates the number of empty stars

            for (let i = 1; i <= emptyStars; i++) {
                starArr.push(0);
            }
            // This for loop adds 0s to the array to represent empty stars
            console.log("starrrs", starArr)
            function starRating(star) {
                if (star === 0) return <i className="fa-regular fa-star" style="color: #d50b1f;"></i>
                else if (star < 1) return <i className="fa-solid fa-star-half-stroke" style="color: #d50b1f;"></i>
                else return <i className="fa-solid fa-star" style="color: #d50b1f;"></i>
            }
        }

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
                                    <div className="star-row">
                                    {
                                        starArr.map(star => {
                                            if (star === 0) return <i className="fa-regular fa-star"></i>
                                            else if (star < 1) return <i className="fa-solid fa-star-half-stroke" ></i>
                                            else return <i className="fa-solid fa-star" ></i>
                                        })
                                    }
                                    </div>
                                    <div className="number-rating">{restaurant.averageRating}</div>
                                </div>
                                <div className="review-summary">
                                    <i className="fa-regular fa-message"></i>
                                    <span>  {restaurant.reviews.length} {reviews}</span>
                                </div>
                                <div className="money">
                                    <i className="fa-sharp fa-regular fa-money-bill-1"></i> {priceRange}
                                </div>
                                <div className="cuisine-type"><i className="fa-solid fa-utensils"></i> {restaurant.cuisineType}</div>

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
                                    restaurant.reviews.map((review, i) => (
                                        <div className="individual-review" key={i}>
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
