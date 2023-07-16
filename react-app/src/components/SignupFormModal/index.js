import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [email, setEmail] = useState("");
	const [phone_number, setPhone_number] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [owner, setOwner] = useState(false);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(first_name, last_name, email, phone_number, password, owner));
			if (data) {
				setErrors(data);
			} else {
				if (owner) {
					const createRestaurant = window.confirm("Do you want to create a restaurant?")
					if (createRestaurant) {

						history.push("/new-restaurant");
					} else {
						history.push("/");
					}
				} else {
					history.push("/");
				}
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-form">
			<h1 className="signup-header">Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul className="errors">
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className="fname-label">
					First Name
					<input
					className="fname-input"
					type="text"
					value={first_name}
					onChange={(e) => setFirst_name(e.target.value)}
					required
					/>
				</label>
				<label className="lname-label">
					Last Name
					<input
					className="lname-input"
					type="text"
					value={last_name}
					onChange={(e) => setLast_name(e.target.value)}
					required
					/>
				</label>
				<label className="elabel">
					Email
					<input
					className="email-input"
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label className="phone-label">
					Phone Number
					<input
					className="phone-input"
						type="text"
						value={phone_number}
						onChange={(e) => setPhone_number(e.target.value)}
						required
					/>
				</label>
				<label className="plabel">
					Password
					<input
					className="pass-input"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label className="plabel">
					Confirm Password
					<input
					className="pass-input"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<label className="owner-label">
					Are you an owner?
					<input
					className="owner-input"  
					type="checkbox"
					checked={owner}
					onChange={(e) => setOwner(e.target.checked)}
					/>
				</label>
				<button className="signup-button" type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
