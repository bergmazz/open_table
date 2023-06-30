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

    if (restaurant) {
        console.log("RESTAURANTAASSSSSSSSSSSSSSS", restaurant)
        return (
            <>
                <h1>Restaurant Details</h1>

            </>
        )
    } else {
        return null;
    }

}

export default RestaurantPage;
