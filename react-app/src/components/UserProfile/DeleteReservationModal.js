import { useModal } from "../../context/Modal";



function DeleteReservationModal({reservation}) {
    console.log("herrreeeee", reservation)
    const restaurant = reservation.restaurant[0];
    console.log("restaurant", restaurant)

    return (
        <>
        <div>Are you sure you want to cancel this reservation?</div>
        <div className="del-restaurant-info">{restaurant.restaurantName} - {restaurant.city}</div>
        </>
    )
}

export default DeleteReservationModal;
