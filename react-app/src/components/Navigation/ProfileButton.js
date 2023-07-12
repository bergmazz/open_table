import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef()

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
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="user-greeting">Hello, {user.firstName}!</li>
            <div onClick={closeMenuAndNavigate}>
              <li className="dropdown-item">
                <NavLink to="/user">My Profile</NavLink>
              </li>
            </div>
            <div onClick={closeMenuAndNavigate}>
              <li className="dropdown-item">
                <NavLink to="/user/favorites">My Favorite Restaurants</NavLink>
              </li>
            </div>
            <li className="dropdown-item">
              <button onClick={handleLogout} className="logout-user">Log Out</button>
            </li>
          </>
        ) : (
          <>
            <li className="dropdown-item">
              <OpenModalButton 
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li className="dropdown-item">
              <OpenModalButton
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
