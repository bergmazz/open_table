import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserReservations } from "../../store/reservation"
// import ReservationFormModal from "../ReservationFormModal";
import "./UserProfile.css"

function UserProfile () {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getUserReservations() );
    }, [ dispatch ] );

    const currentUser = useSelector( state => state.session.user )
    const reservations = useSelector( state => state.reservations.byUser )
    // console.log( "---------------byUser state:", reservations )

    return (
        <>
            <div className="extends-nav-height">
                <h2>{ currentUser.firstName }{ currentUser.lastName }</h2>
                <h4>0 points</h4>
            </div>

            <div className="links">
                <Link to="/user/restaurants">Owned Restaurants</Link>
                <Link to="/user/favorites">Favorites</Link>
                <Link to="/user/details">Account Details</Link>
            </div>

            <div className="points-container">
                <h3>Points</h3>
                <h4>Your points: 0 points</h4>
                <div className="earned">
                    <p>Earned</p>
                    <h4>0 PTS</h4>
                </div>
                <div className="goal">
                    <p>Next Reward</p>
                    <h4>2,000 PTS</h4>
                </div>
                <div className="points-bar" >
                    <img alt="progress towards reward"></img>
                </div>
                <div className="reward">
                    <p>You are only 2,000 points away from a $10 reward!</p>
                </div>
            </div>

            <div className="reservations-container">
                { reservations.length > 0 ? (
                    <div>
                        <h1>Your Reservations</h1>
                        { reservations.map( ( reservation ) => (
                            <div>
                                <img src={ reservation.restaurant[ 0 ].coverImage } />
                                <p>{ reservation.restaurant[ 0 ].restaurantName }</p>
                                <p>{ reservation.reservationTime }</p>
                            </div>
                        ) )
                        }
                    </div>
                ) : (
                    <>
                            <h1>You have no upoming reservations</h1>
                            <h3>Find your table for any occasion</h3>
                            {/* <ReservationFormBar></ReservationFormBar> */ }
                    </>
                ) }
            </div>

        </>
    );
}


export default UserProfile;
