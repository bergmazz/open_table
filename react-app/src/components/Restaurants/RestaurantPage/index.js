import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailsRestaurant } from "../../../store/restaurantDetails";
import CreateReviewModal from "../../Reviews/NewReview";
import './RestaurantPage.css'
import { getFavorites ,addFavorites, deleteFavorites } from "../../../store/favorite";

const RestaurantPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const restaurant = useSelector(state => state.restaurantDetails);
    const favorites = useSelector(state => state.favorites);
    const user = useSelector(state => state.session?.user);
    const [favorite, setFavorite] = useState(false);
    // console.log("USSRRRR", user)
    // console.log("restaurant iddddd", id)


    console.log("1: IN RESTAURANT DETAILS COMPONENT", restaurant);
    // console.log("FAVORITE BEGINNING", favorites)


    useEffect(() => {
        console.log("2: I'm in the useEffect function.")
        dispatch(getDetailsRestaurant(id));
        if (user) dispatch(getFavorites(user.id))
    }, [dispatch]);



    if (!user && Object.keys(restaurant).length || user && Object.keys(favorites).length !== 0) {
    //     console.log("favorites", favorites)
    //     let favArr = Object.values(favorites);


    //     // check if already saved restaurant
    //     let checkFav = false;
    //     if (favArr) {
    //     checkFav = favorites.find(f => f.restaurantId === id);
    //     console.log("AFTER CHECK FAVE, IS IT ALREADY SAVED?-----------", Object.values(favorites).filter(f => f.restaurantId === id))
    //     // checkFav = Object.values(favorites).every(fav => fav.restaurantId == id);
    // }


        // check restaurant info
        let reviews = "Reviews";
        console.log("XXXX, ", restaurant.reviews)
        if (restaurant.reviews.length) {
            if (restaurant.reviews.length === 1) {
                reviews = "Review";
            }
        }
        let priceRange = "$50 and over"
        if (restaurant.priceRange <= 2) priceRange = "$30 and under";
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

        // add fav
        const addFav = (e) => {
            e.preventDefault();
            console.log("in save restauranttttttt")
            dispatch(addFavorites(user.id, id));
            setFavorite(true)
          };


        // delete fav
        const deleteFav = (e) => {
            e.preventDefault();
            console.log("in UNNsave restauranttttttt", )

            console.log("in addFAv, ", favorites)
            dispatch(deleteFavorites(user.id));
            setFavorite(false);
          };

        return (
            <div className="outer-restaurant-container">
                <div className="restaurant-container">

                    <div className="restaurant-cover-image">
                        <img className="restaurant-image-cover" src={`${restaurant.coverImage}`} alt="" />
                        {
                            user ? (
                                <span>
                                    {
                                        favorite ? (
                                            <button className="fav-button" onClick={deleteFav}><i className="fa-solid fa-heart"></i></button>
                                        ) : (
                                            <button className="fav-button" onClick={addFav}><i className="far fa-heart"></i></button>
                                        )
                                    }
                                </span>
                            ): null}

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
                                        starArr.map((star, i) => {
                                            if (star === 0) return <i className="fa-regular fa-star" key={i}></i>
                                            else if (star < 1) return <i className="fa-solid fa-star-half-stroke" key={i}></i>
                                            else return <i className="fa-solid fa-star" key={i}></i>
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
                                        <div className="individual-review" key={review.id}>
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
