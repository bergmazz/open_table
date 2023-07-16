import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReservations } from "../../store/reservation";

function DeleteReservationModal({reservation}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // console.log("herrreeeee", reservation)
    const restaurant = reservation.restaurant[0];
    // console.log("restaurant", restaurant)
    const dateArr = reservation.reservationTime.split(" ");
    const time = dateArr[4].split(":");
    const amPm = time[0] >= 12 ? "pm" : "am";
    const hours = ((time[0] % 12) || 12);
    const reservationTime = hours + ":" + time[1] + " " + amPm;

    const deleteRes = (e) => {
        e.preventDefault();
        return dispatch(deleteReservations(reservation.id, reservation.restaurantId))
        .then(closeModal)
    }

    return (
        <>
        <div>Are you sure you want to cancel this reservation?</div>
        <div>{restaurant.restaurantName}</div>
        <div>
            <span><i className="fa-regular fa-user"></i> {reservation.numberOfPeople} (Standard seating) </span>
            <span><i className="fa-regular fa-calendar"></i> {dateArr[0]} {dateArr[1]} {dateArr[2]}</span>
            <span> at {reservationTime}</span>
        </div>
        <button onClick={closeModal}>Nevermind</button>
        <button onClick={deleteRes}>Confirm Cancellation</button>
        </>
    )
}

export default DeleteReservationModal;
