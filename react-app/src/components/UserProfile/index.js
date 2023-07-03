import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReservations } from "../../store/reservation"
// import ReservationFormModal from "../ReservationFormModal";


function UserProfile () {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( getUserReservations() );
    }, [ dispatch ] );

    const currentUser = useSelector( state => state.session.user )
    const reservationsObj = useSelector( state => state.reservations.byUser )
    const reservations = Object.values( reservationsObj )
    // console.log( "---------------byUser state:", reservations )

    return (
        <>
            <div className="extends-nav-height">
                <h2>{ currentUser.firstName }{ currentUser.lastName }</h2>
                <h4>0 points</h4>
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

            <div className="Reservations">
                { reservations ? (
                    <>
                        <li>{ reservations }</li>
                    </>

                ) : (
                    <>
                        <h1>Create a reservation</h1>
                        {/* <ReservationModal></ReservationModal> */ }
                    </>
                ) }
            </div>

        </>
    );
}


export default UserProfile;
