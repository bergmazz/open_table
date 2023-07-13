import React, { useState, useRef, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();

  const [showMenu, setShowMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      setEmail("");
      setPassword("");
    } else {
        history.push("/")
    }
  };

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

  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'));
    history.push('/')
  }

  const closeMenu = () => setShowMenu(false);

  return (
    <div className="login-form-c">
      <h1 className="login-header">Log In</h1>
      <form onSubmit={handleSubmit}>
      <ul className="errors">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="l-elabel">
          Email
          <input
            className="l-email-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your email"
            required
          />
        </label>
        <label className="l-plabel">
          Password
          <input
            className="l-pass-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Please enter your password"
            required
          />
        </label>
        <button type="submit" className="loginbttn">Log In</button>
        <button onClick={demoUser} type='submit' className="demoLogin">Demo User</button>
      </form>
      <h2 className="login-header">Not a member?</h2>
      <OpenModalButton
                className='signup-user'
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
      />
    </div>
  );
}

export default LoginFormPage;
