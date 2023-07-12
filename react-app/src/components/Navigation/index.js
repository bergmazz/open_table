import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navigation-bar-container'>
			<li className='home-button'>
				<NavLink className='home-link' exact to="/">Bone Apple Teeth</NavLink>
			</li>
			 <li className='profile-button-position'>
				<ProfileButton user={sessionUser} />
			</li>
		</ul>
	);
}

export default Navigation;


// {sessionUser && (
// 	<li className='profile-reservation-position'>
// 		<Link to="/user/reservations">
// 			<button>
// 				<i className='fa-solid fa-calendar'></i>
// 			</button>
// 		</Link> 
// 		{/* <NavLink className='reservation-link' to="/user/reservations">Upcoming reservations</NavLink> */}
// 	</li>
// 	)}
