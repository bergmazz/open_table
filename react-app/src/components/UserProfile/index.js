import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserReservations } from "../../store/reservation"
import { authenticate } from "../../store/session";
import SearchBar from "../SearchBar";
import ReservationModal from "../ReservationModal";
import OpenModalButton from "../OpenModalButton";
import DeleteReservationModal from "./DeleteReservationModal";
import CreateReviewModal from "../Reviews/NewReview";
import EditReviewForm from "../Reviews/EditReview";
import DeleteReviewForm from "../Reviews/DeleteReview";

import "./UserProfile.css"

function timeFormat ( reservation ) {
    const dateArr = reservation.reservationTime.split( " " );
    // console.log( "date arr ------------", dateArr )
    const time = dateArr[ 4 ].split( ":" );
    const amPm = time[ 0 ] >= 12 ? "pm" : "am";
    const hours = ( ( time[ 0 ] % 12 ) || 12 );
    const formatTime = hours + ":" + time[ 1 ] + " " + amPm;
    const formatAll = dateArr[ 0 ] + " " + dateArr[ 2 ] + " " + dateArr[ 1 ] + " " + dateArr[ 3 ] + " " + formatTime
    return formatAll
}

function UserProfile() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [ showMenu, setShowMenu ] = useState( false );
    const ulRef = useRef()

    const closeMenu = ( e ) => {
        if ( !ulRef.current.contains( e.target ) ) {
            setShowMenu( false );
        }
    };

    useEffect( () => {
        dispatch( authenticate() )
        dispatch( getUserReservations() );

        if ( !showMenu ) return;

        closeMenu()
        document.addEventListener( "click", closeMenu );

        return () => document.removeEventListener( "click", closeMenu );

    }, [ dispatch, showMenu ] );

    useEffect(() => {
        dispatch(getUserReservations());
    }, [dispatch]);

    const currentUser = useSelector(state => state.session.user)
    const reservations = useSelector( state => state.reservations.byUser )
    const reviews = currentUser.reviews
    console.log( "reviews:", reviews )
    // console.log("RESERRRVATTIIONNNNS", reservations)
    // const points = useSelector( ( state ) => state.reservations.points );
    const points = reservations.length * 100
    // console.log( "---------------byUser state:", reservations )
    const goal = 5000;
    const progress = Math.min((points / goal) * 100, 100);

    const upcomingReservations = reservations.filter(res => res.status === "confirmed");
    const pastReservations = reservations.filter(res => res.status === "attended");
    const cancelledReservations = reservations.filter(res => res.status === "cancelled");

    if ( pastReservations ) {
        for ( let reserv of pastReservations ) {
            console.log( "reservation:", Object.values( reserv ) )
            reserv[ "hasReview" ] = false

            for ( let review of reviews ) {
                if ( review.restaurantId === reserv.restaurantId ) {
                    reserv[ "hasReview" ] = true
                }
            }
        }



    }

    if (!currentUser) return (
        <div className='no-user'>
            <h1 className='no-user'>Sorry, you need to log in</h1>
            <Link to="/login"> </Link>
        </div>
    )

    return (
        <div className="user">
            <div className="extends-nav-height">
                <h2>{currentUser.firstName}{currentUser.lastName}</h2>
                <h4>{points} points</h4>
            </div>

            <div className="links">
                <Link to="/user/restaurants">Owned Restaurants</Link>
                <Link to="/user/favorites">Favorites</Link>
                {/* <Link to="/user/details">Account Details</Link> */}
            </div>

            <div className="points-container">
                <h3>Your Points</h3>
                <div className="earned">
                    <p>Earned</p>
                    <h4>{points}  PTS</h4>
                </div>
                <div className="goal">
                    <p>Next Reward</p>
                    <h4>5,000 PTS</h4>
                </div>
                <div className="points-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
                <div className="reservations-container">
                    {
                        reservations.length ? (
                            <>
                                <div>
                                    <h2>Upcoming Reservations</h2>
                                    {
                                        upcomingReservations.length ? (
                                            upcomingReservations.map((reservation) => (
                                                <div className="reservation-tile">
                                                    <img className="reservimg" src={reservation.restaurant[0].coverImage} />
                                                    <div className="col2">
                                                        <p className="reservname">{ reservation.restaurant[ 0 ].restaurantName }</p>
                                                        <span className="reservuser"><i className="fa-regular fa-user"></i>  { reservation.numberOfPeople } guests </span>
                                                        <span className="reservtime"><i className="fa-regular fa-calendar"></i>   { timeFormat( reservation ) } </span>
                                                    <OpenModalButton
                                                        className='edit-reserv'
                                                        buttonText="Modify"
                                                        onItemClick={ closeMenu }
                                                        modalComponent={ <ReservationModal reservation={ reservation } /> }
                                                    />
                                                    <OpenModalButton
                                                        className='cancel-reserv'
                                                        buttonText="Cancel"
                                                        modalComponent={<DeleteReservationModal reservation={reservation} />}
                                                    />
                                                    </div>

                                                </div>
                                            ))) : (
                                            <div>You have no upcoming reservations</div>
                                        )
                                    }

                                </div>

                                <div>
                                    <h2>Past Reservations</h2>
                                    {
                                        pastReservations.length ? (
                                            pastReservations.map((reservation) => (
                                                <div className="reservation-tile">
                                                    <img className="reservimg" src={reservation.restaurant[0].coverImage} />
                                                    <div className="col2">
                                                        <p className="reservname">{reservation.restaurant[0].restaurantName}</p>
                                                        <span className="reservuser"><i className="fa-regular fa-user"></i>  { reservation.numberOfPeople } guests </span>
                                                        <span className="reservtime"><i className="fa-regular fa-calendar"></i>   { timeFormat( reservation ) } </span>
                                                        { !reservation.hasReview ? (
                                                            <OpenModalButton
                                                                className='review-reserv'
                                                                buttonText='Leave a Review'
                                                                modalComponent={ <CreateReviewModal reservation={ reservation } /> }
                                                            /> ) : (
                                                            <>
                                                                {/* ******TO DO Does not yet work, isnt accessing review props */ }
                                                                {/* <OpenModalButton
                                                                    buttonText='Edit Review'
                                                                    modalComponent={ <EditReviewForm review={ review } /> }
                                                                />
                                                                <OpenModalButton
                                                                    buttonText='Delete Review'
                                                                    modalComponent={ <DeleteReviewForm review={ review } /> }
                                                                /> */}
                                                            </>
                                                        ) }
                                                    </div>
                                                </div>
                                            ))) : (
                                            <div>You have no past reservations</div>
                                        )
                                    }
                                </div>
                                <div>
                                    <h2>Cancelled Reservations</h2>
                                    {
                                        cancelledReservations.length ? (
                                            cancelledReservations.map((reservation) => (
                                                <div className="reservation-tile">
                                                    <img className="reservimg" src={reservation.restaurant[0].coverImage} />
                                                    <div className="col2">
                                                        <p className="reservname">{ reservation.restaurant[ 0 ].restaurantName }</p>
                                                        <span className="reservuser"><i className="fa-regular fa-user"></i>  { reservation.numberOfPeople } guests </span>
                                                        <span className="reservtime"><i className="fa-regular fa-calendar"></i>   { timeFormat( reservation ) } </span>
                                                    </div>
                                                </div>
                                            ))) : (
                                            <div>You have no cancelled reservations</div>
                                        )
                                    }
                                </div>
                            </>



                        ) : (
                            <>
                                <h1>You have no upoming or past reservations</h1>
                                <h3>Find your table for any occasion</h3>
                                <button className="table-button" onClick={ () => history.push( '/restaurants' ) }>
                                    Find a table
                                </button>
                            </>
                        )
                    }

            </div>
        </div>
    );
}


export default UserProfile;
