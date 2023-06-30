import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../../store/restaurant";
import { NavLink } from "react-router-dom";


const AllRestaurants = () => {
    const dispatch = useDispatch();

    const allRestaurants = useSelector(state => state.restaurants)

    // const restaurantValues = Object.values(allRestaurants)

    console.log("1: IN RESTAURANTS COMPONENT", allRestaurants);

    useEffect(() => {
        console.log("2: I'm in the useEffect function.")
        dispatch(getRestaurants());
    }, [dispatch]);

    if (allRestaurants) {
        console.log("ALLL RESTAURANTAASSSSSSSSSSSSSSS", allRestaurants)

        return (
                <div>
                    {
                        Object.values(allRestaurants).map(restaurant => {
                            <div>restaurant.restaurant_name</div>
                        })
                    }
                </div>

        )
    } else {
        return null;
    }

}

export default AllRestaurants;
