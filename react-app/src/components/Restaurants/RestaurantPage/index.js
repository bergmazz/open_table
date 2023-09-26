import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailsRestaurant } from "../../../store/restaurantDetails";
import EditReviewForm from "../../Reviews/EditReview";
import DeleteReviewForm from "../../Reviews/DeleteReview";
import OpenModalButton from "../../OpenModalButton";
import ReservationForm from "../../ReservationForm";
import './RestaurantPage.css'
import { getFavorites, addFavorites, deleteFavorites } from "../../../store/favorite";

const RestaurantPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const restaurant = useSelector(state => state.restaurantDetails);
    const favorites = useSelector(state => state.favorites);
  
    const user = useSelector(state => state.session.user);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        dispatch(getDetailsRestaurant(id));
        if (user) {
            dispatch(getFavorites(user.id))
                .then(() => setLoadingFavorites(false))
                .catch((error) => {
                    console.log("Error fetching favorites:", error);
                    setLoadingFavorites(false);
                });
        } else {
            setLoadingFavorites(false);
        }
    }, [dispatch, id, user]);

    // checks if restaurant is in user's favorites
    useEffect(() => {
        if (user && favorites.length) {
            for (let i = 0; i < favorites.length; i++) {
                if(favorites[i].restaurantId == id) {
                    setFavorite(true)
                }
            }
        }
    }, [favorites, id, user]);

    const addFav = () => {
        dispatch(addFavorites(user.id, id))
            .then(() => dispatch(getFavorites(user.id)))
            .then(() => setFavorite(true))
            .catch((error) => console.log("Error adding favorite: ", error));
    };

    const deleteFav = () => {
        let favId;
        for (let i = 0; i < favorites.length; i++) {
            if(favorites[i].restaurantId == id) {
                favId = favorites[i].id
            }
        }
        // console.log("hereeeee, ", favId)
                dispatch(deleteFavorites(favId, user.id))
                    .then(() => dispatch(getFavorites(user.id)))
                    .then(() => setFavorite(false))
                    .catch((error) => console.log("Error deleting favorite: ", error));

    };

    if (Object.keys(restaurant).length) {
        // check restaurant reviews and price
        let reviews = "Reviews";
        if (restaurant.reviews.length === 1) reviews = "Review";
        let priceRange = "$50 or more"
        if (restaurant.priceRange <= 2) priceRange = "$30 or less";
        if (restaurant.priceRange === 3) priceRange = "$31 to $50";

        // star rating
        const fullStars = Math.floor(restaurant.averageRating);
        const starArr = [];
        for (let i = 1; i <= fullStars; i++) {
            starArr.push(1);
        }
        if (restaurant.averageRating < 5) {
            const partialStar = restaurant.averageRating - fullStars;
            starArr.push(partialStar);
            const emptyStars = 5 - starArr.length;
            for (let i = 1; i <= emptyStars; i++) {
                starArr.push(0);
            }
        }

        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        const convertDate = (date) => {
            const month = monthNames[new Date(date).getMonth()];
            const year = new Date(date).getFullYear();

            return (
                <p className="reviews-date">{month} {year}</p>
            )
        }

        const makeStars = (rating) => {
            const starArr = [];
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    starArr.push(<i key={i} className='fa-solid fa-star '></i>);
                } else {
                    starArr.push(<i key={i} className='fa-regular fa-star'></i>);
                }
            }
            return starArr;
        }



        // console.log("STARRRRR", starArr)
        if (loadingFavorites && !user) {
            return <div>Loading favorites....</div>
        }

        return (
            <div className="outer-restaurant-container">
                <div className="restaurant-container">
                    <div className="restaurant-cover-image">
                        <img className="restaurant-image-cover" src={`${restaurant.coverImage}`} alt="" />
                        {user && (
                            <span>
                                {favorite ? (
                                    <button className="fav-button" onClick={deleteFav}>
                                        <i className="fa-solid fa-heart"></i>
                                    </button>
                                ) : (
                                    <button className="fav-button" onClick={addFav}>
                                        <i className="far fa-heart"></i>
                                    </button>
                                )}
                            </span>
                        )}
                    </div>
                    <div className="restaurant-column1">
                        <ul className="restaurant-links">
                            <li className="restaurant-overview-link">
                                <a href="#top">Overview</a>
                            </li>
                            <li className="restaurant-review-link">
                                <a href="#restaurant-reviews">Reviews</a>
                            </li>
                        </ul>
                        <div id="top" className="restaurant-name">{`${restaurant.restaurantName}`}</div>
                        {/* <div className="separator"></div> */}
                        <div className="random-box">
                            <div className="ratings-average-bar">
                                <div className="ratings">
                                    <div className="star-row">
                                        {starArr.map((star, i) => {
                                            if (star === 0) return <i className="fa-regular fa-star" key={i}></i>
                                            else if (star < 1) return <i className="fa-solid fa-star-half-stroke" key={i}></i>
                                            else return <i className="fa-solid fa-star" key={i}></i>
                                        })}
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
                        </div>
                        <div id="restaurant-reviews">
                            <div className="reviews-bar">
                                <div className="total-restaurant-reviews">{restaurant.reviews.length} {reviews}</div>
                                <div className="sort-reviews">{restaurant.reviews.length > 0 ? "Newest" : "No review yet"}</div>
                            </div>
                            <div className="reviews-area">
                                {
                                    restaurant.reviews.map((review, i) => (
                                        <div className="individual-review" key={review.id}>
                                            <div className="user-section">
                                               <p className="username"> {review.username} </p>
                                                <p className="date">{convertDate(review.createdAt)}</p>
                                            </div>
                                            <div className="review-comment2">{review.comment}</div>
                                            <div className="review-stars">
                                                {
                                                    [...Array(5)].map((x, i) => {
                                                        if (i < Math.floor(review.rating)) {
                                                          return <i className="fa-solid fa-star" key={i}></i>;
                                                        } else if (i < review.rating) {
                                                          return <i className="fa-solid fa-star-half-stroke" key={i}></i>;
                                                        } else {
                                                          return <i className="fa-regular fa-star" key={i}></i>;
                                                        }
                                                      })
                                                }
                                            </div>
                                            { review.reviewImage && (
                                                <div className="review-image-container2">
                                                 <img className="review-image2" src={review.reviewImage}></img>
                                            </div>
                                            )}
                                            <br></br>
                                            {user && user.id === review.userId && (
                                                <div className="review-modal-buttons">
                                                    <div className="edit-res-review">
                                                        <button className="edit-review-res-button">
                                                            <OpenModalButton
                                                                buttonText='Edit Review'
                                                                modalComponent={<EditReviewForm review={review} />}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="delete-res-review">
                                                        <button className="del-review-res-button">
                                                            <OpenModalButton
                                                                buttonText='Delete Review'
                                                                modalComponent={<DeleteReviewForm review={review}/>}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>


                                            )}

                                        </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="restaurant-column2">
                        {/* <div className="reservation-box">
                            <div className="make-res">Make a reservation</div>
                            <div className="party-size">Party Size</div>
                            <div className="party-select">2 people</div>
                            <div className="res-time">date time</div>
                            <div className="find-time">find time</div>
                            <div className="times-booked">Booked 11 times today</div>
                        </div> */}
                        <div className="reservation-box">
                            <div className="make-res-header">Make a reservation</div>
                            <div className="separator"></div>
                            <ReservationForm />
                        </div>
                        <div className="restaurant-details-section">
                            <div className="details-header">
        {/* This is the header for the section */}
        <h2>Restaurant Details</h2>
    </div>
    <div className="details-container">
    <div className="detail-item">
        <h3><i className="fas fa-utensils"></i>Cuisine</h3>
        <p>{restaurant.cuisineType}</p>
    </div>

    <div className="detail-item">
        <h3><i className="fas fa-money-bill-wave"></i>Price Range</h3>
        <span className="active-price2">{ "$".repeat(restaurant.priceRange) }</span>
        <span className="inactive-price2">{ "$".repeat(4 - restaurant.priceRange) }</span>
    </div>

    <div className="detail-item">
        <h3><i className="fas fa-clock"></i>Hours of Operation</h3>
        <div className="sub-detail-item">
            <h4>Sunday - Saturday</h4>
            <p>{restaurant.openHours} - {restaurant.closingHours}</p>
        </div>
    </div>

    <div className="detail-item">
        <h3><i className="fas fa-map-marker-alt"></i>Address</h3>
        <p>{restaurant.address}</p>
    </div>
</div>
</div>
                        {/* <div className="map-container">Map</div>
                        <div className="delivery-box">Delivery</div> */}
                    </div>

                </div>
            </div>
        )
    } else {
        return <div>Loading....</div>
    }
}

export default RestaurantPage;
