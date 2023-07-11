import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearRestaurants, getRestaurants } from "../../../store/restaurant";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AllRestaurants = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [ selectedTimeSlot, setSelectedTimeSlot ] = useState( "" );
    const todayDate = new Date().toLocaleDateString();
    const queryParams = new URLSearchParams( location.search );
    const cuisineType = queryParams.get( "type" );
    const city = queryParams.get( "city" );

    const allRestaurants = useSelector(state => state.restaurants)

    const restaurantValues = Object.values(allRestaurants)

    // console.log("1: IN RESTAURANTS COMPONENT", allRestaurants);

    useEffect( () => {
        // Clear existing restaurants before fetching new ones
        dispatch( clearRestaurants() );
        dispatch( getRestaurants( cuisineType, city ) );
    }, [ dispatch, cuisineType, city ] );

    if (restaurantValues.length) {
    //     restaurantValues.map( restaurant => {
    //         console.log( restaurant.nextThreeAvailableSlots )
    //     } )

        return (
            <div>
                <h1>Restaurants</h1>
                {
                    restaurantValues.map(restaurant => (
                        <div key={ restaurant.id }>
                            {/* { `${ restaurant.restaurantName }` }
                            { `${ restaurant.nextThreeAvailableSlots } ` } */}
                        </div>

                    ))
                }
            </div>
        )
    } else {
        return null;
    }

}

export default AllRestaurants;
