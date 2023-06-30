import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../../store/restaurant";
import { NavLink } from "react-router-dom";


const AllRestaurants = () => {
    const dispatch = useDispatch();

    const allRestaurants = useSelector(state => state.restaurants)

    const restaurantValues = Object.values(allRestaurants)

    console.log("1: IN RESTAURANTS COMPONENT", allRestaurants);

    useEffect(() => {
        console.log("2: I'm in the useEffect function.")
        dispatch(getRestaurants());
    }, [dispatch]);

    if (restaurantValues.length) {
        console.log("ALLL RESTAURANTAASSSSSSSSSSSSSSS", allRestaurants)
        console.log("AhhhhhhhhhS", restaurantValues)
        restaurantValues.map(restaurant => {
            console.log(restaurant.restaurantName)
        })
        return (
            <div>
                <h1>Restaurants</h1>
                {
                    restaurantValues.map(restaurant => (
                        <>
                            <div>{`${restaurant.restaurantName}`}</div>
                        </>
                    ))
                }
            </div>
        )
    } else {
        return null;
    }

}

export default AllRestaurants;
