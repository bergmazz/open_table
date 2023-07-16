import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { getUserReservations } from "../../store/reservation";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();

  const reservations = useSelector((state) => state.reservations.byUser);
  const points = reservations.length * 100;
  const goal = 5000;

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (user){
      dispatch(getUserReservations());
    }
  }, [dispatch, user]);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setShowMenu(false);
    history.push("/");
  };

  const closeMenuAndNavigate = (e) => {
    e.stopPropagation();
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="dropdown-container">
      <button className="dropdown-btn" onClick={openMenu}>
      <i class="fa-regular fa-circle-user"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="user-greeting">Hello, {user.firstName}!</li>
            <div className="user-points-container">
            <div className="user-points">
            <p>Earned</p>
              <div className="pts">
                {points} PTS
                </div>
            </div>
            <div className="goal-points">
            <p>Next reward</p>
            <div className="goal-pts">
                {goal} PTS
                </div>
            </div>
            </div>
            <div onClick={closeMenuAndNavigate}>
              <li className="dropdown-item">
                <NavLink className='block' to="/user">My Profile</NavLink>
              </li>
            </div>
            <div onClick={closeMenuAndNavigate}>
              <li className="dropdown-item">
                <NavLink className="block" to="/user/favorites">My Favorite Restaurants</NavLink>
              </li>
            </div>
            <li className="log-out">
              <button onClick={handleLogout} className="logout-user">Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li className="dropdown-item">
              <OpenModalButton
                className='login-user' 
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li className="dropdown-item">
              <OpenModalButton
                className='signup-user'
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
