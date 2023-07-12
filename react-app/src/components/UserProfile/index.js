import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserReservations } from "../../store/reservation"
import SearchBar from "../SearchBar";

import "./UserProfile.css"

function UserProfile () {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getUserReservations() );
    }, [ dispatch ] );

    const currentUser = useSelector( state => state.session.user )
    const reservations = useSelector( state => state.reservations.byUser )
    // const points = useSelector( ( state ) => state.reservations.points );
    const points = reservations.length * 100
    // console.log( "---------------byUser state:", reservations )
    const goal = 5000;
    const progress = Math.min( ( points / goal ) * 100, 100 );

    return (
        <div className="user">
            <div className="extends-nav-height">
                <h2>{ currentUser.firstName }{ currentUser.lastName }</h2>
                <h4>{ points } points</h4>
            </div>

            <div className="links">
                <Link to="/user/restaurants">Owned Restaurants</Link>
                <Link to="/user/favorites">Favorites</Link>
                {/* <Link to="/user/details">Account Details</Link> */ }
            </div>

            <div className="points-container">
                <h3>Points</h3>
                <h4>Your points: { points }  points</h4>
                <div className="earned">
                    <p>Earned</p>
                    <h4>{ points }  PTS</h4>
                </div>
                <div className="goal">
                    <p>Next Reward</p>
                    <h4>5,000 PTS</h4>
                </div>
                <div className="points-bar">
                    <div className="progress" style={ { width: `${ progress }%` } }></div>
                </div>
                {/* <div className="reward">
                    <p>It only takes 5,000 points for a $10 reward!</p>
                </div> */}
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
                        <SearchBar></SearchBar>
                    </div>
                ) : (
                    <>
                            <h1>You have no upoming reservations</h1>
                            <h3>Find your table for any occasion</h3>
                            {/* <SearchBar></SearchBar> */ }
                    </>
                ) }
            </div>

        </div>
    );
}


export default UserProfile;
