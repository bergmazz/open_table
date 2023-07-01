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

                <div className="restaurant-column1">
                    <ul className="restaurant-navbar">
                        <li>
                            <NavLink exact to ="/restaurants/`${restaurant.id}`">Overview</NavLink>
                        </li>
                        <li>
                            <a id="restaurant-reviews" href="#element_target">Reviews</a>
                        </li>
                    </ul>
                    <h1>{`${restaurant.restaurantName}`}</h1>
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
