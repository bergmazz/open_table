import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import boneapple from './images/boneapple.jpg'
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul className='navigation-bar-container'>
			<div className='left-nav-group'>
			<NavLink to='/' className='logo-button'>
			<img className='logo' src={boneapple} alt='logo' />
			</NavLink>
			<li className='home-button'>
				<NavLink className='home-link' exact to="/">Bone Apple Teeth</NavLink>
			</li>
			</div>
			 <li className='profile-button-position'>
				<ProfileButton user={sessionUser} />
			</li>
		</ul>
	);
}

export default Navigation;
