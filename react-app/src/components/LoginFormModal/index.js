import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login('demo@aa.io', 'password'));
    closeModal()
  }

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
            required
          />
        </label>
        <button type="submit" className="loginbttn">Log In</button>
        <button onClick={demoUser} type='submit' className="demoLogin">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
