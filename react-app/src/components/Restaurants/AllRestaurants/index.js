import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../../store/restaurant";
import { NavLink } from "react-router-dom";


const AllRestaurants = () => {
    const dispatch = useDispatch();

    const allRestaurants = useSelector(state => state.restaurants)

    console.log("IN RESTAURANTS COMPONENT", allRestaurants);

    useEffect(() => {
        dispatch(getRestaurants());
    }, [dispatch]);

    if (allRestaurants) {
        console.log("ALLL RESTAURANTAASSSSSSSSSSSSSSS", allRestaurants)

        return (
                <div>
                    <h1>Test</h1>
                </div>

        )
    } else {
        return null;
    }

}

export default AllRestaurants;
