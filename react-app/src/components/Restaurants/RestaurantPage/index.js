import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailsRestaurant } from "../../../store/restaurantDetails";

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
            <>
                <h1>Restaurant Details</h1>
                <div>Restaurant Name: {`${restaurant.restaurantName}`}</div>
                <h2>Reviews</h2>
                {
                    restaurant.reviews.map(review => (
                        <p>{`${review.comment}`}</p>
                    ))
                }
            </>
        )
    } else {
        return (
            <div>Loading....</div>
        )
    }

}

export default RestaurantPage;
