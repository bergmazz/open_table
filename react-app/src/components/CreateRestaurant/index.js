import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addRestaurants, getRestaurants } from '../../store/restaurant';
import './CreateRestaurant.css'

function CreateRestaurant() {
    const [restaurant_name, setRestaurant_name] = useState('');
    const [cover_image, setCover_image] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip_code, setZip_code] = useState('');
    const [country, setCountry] = useState('');
    const [cuisine_type, setCuisine_type] = useState('');
    const [price_range, setPrice_range] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [open_hours, setOpen_hours] = useState('');
    const [closing_hours, setClosing_hours] = useState('');
    const [errors, setErrors] = useState([]);
    const [newRestaurant, setNewRestaurant] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const handleAddRestaurant = async (e) => {
        e.preventDefault();
        setErrors([]);

//         const newErrors = [];
//         if (!restaurant_name) newErrors.push("Please enter a restaurant name");

//         if (newErrors.length > 0) {
//     setErrors(newErrors);
//     return;
// }


        const newRestaurant = {
            userId: sessionUser.id,
            restaurant_name,
            cover_image,
            email,
            address,
            city,
            state,
            zip_code,
            country,
            cuisine_type,
            price_range,
            phone_number,
            open_hours,
            closing_hours,
        };
        const createdRestaurant = await dispatch(addRestaurants(newRestaurant));
        setNewRestaurant(createdRestaurant);
        history.push('user/restaurants');
    }

    useEffect (() => {
        if (newRestaurant) {
            dispatch(getRestaurants());
        }
    }, [dispatch, newRestaurant])

    return (
        <div className='restaurant-form-container'>
            <h1 className='manage-header'>Add Your Restaurant</h1>
            <form id="new-restaurant-form" onSubmit={handleAddRestaurant}>
                <div className='errors'>
                    {/* {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))} */}
                </div>
                <div className='create-name'>
                    <label className='create-label'>
                        Restaurant Name
                        <input
                        className='create-input'
                        type='text'
                        value={restaurant_name}
                        onChange={(e) => setRestaurant_name(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='create-email'>
                    <label >
                        Email
                        <input
                        className='create-input'
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='create-phone'>
                    <label className='create-label'>
                        Phone Number
                        <input
                        className='create-input'
                        type='number'
                        value={phone_number}
                        onChange={(e) => setPhone_number(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='create-city'>
                    <label className='create-label'>
                        City
                        <input
                        className='create-input'
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='create-state'>
                    <label className='create-label'>
                        State
                        <select
                        className='create-select'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        >
                            <option value=''>--Select a State--</option>
                            <option value='CA'>California</option>
                            <option value='NY'>New York</option>
                            <option value='TX'>Texas</option>
                            <option value='FL'>Florida</option>
                        </select>
                    </label>
                </div>
                <div className='create-address'>
                    <label className='create-label'>
                        Address
                        <input
                        className='create-input'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='create-zip'>
                    <label className='create-label'>
                        Zip Code
                        <input
                        className='create-input'
                        type='number'
                        value={zip_code}
                        onChange={(e) => setZip_code(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='create-country'>
                    <label className='create-label'>
                        Country
                        <input
                        className='create-input'
                        type='text'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <div className='create-cuisine'>
                    <label className='create-label'>
                        Cuisine Type
                        <select
                        className='create-select'
                        value={cuisine_type}
                        onChange={(e) => setCuisine_type(e.target.value)}
                        required
                        >
                            <option value=''>--Please select your restaurants cuisine--</option>
                            <option value='Italian'>Italian</option>
                            <option value='Chinese'>Chinese</option>
                            <option value='Mexican'>Mexican</option>
                            <option value='Japanese'>Japanese</option>
                            <option value='American'>American</option>
                            <option value='Indian'>Indian</option>
                            <option value='Thai'>Thai</option>
                            <option value='Spanish'>Spanish</option>
                            <option value='Ethiopian'>Ethiopian</option>
                            <option value='Greek'>Greek</option>
                        </select>
                    </label>    
                </div>
                <div className='create-price'>
                    <label className='create-label'>
                        Price Range
                        <select
                        className='create-select'
                        value={price_range}
                        onChange={(e) => setPrice_range(e.target.value)}
                        required
                        >
                            <option value=''>--Select Price Range--</option>
                            <option value={1}>$</option>
                            <option value={2}>$$</option>
                            <option value={3}>$$$</option>
                            <option value={4}>$$$$</option>
                        </select>
                    </label>    
                </div>
                <div className='create-open'>
                    <label className='create-label'>
                        Open Hours
                        <input
                        className='create-input'
                        type='text'
                        value={open_hours}
                        onChange={(e) => setOpen_hours(e.target.value)}
                        required
                        />
                    </label>    
                </div>
                <div className='create-close'>
                    <label className='create-label'>
                        Closing Hours
                        <input
                        className='create-input'
                        type='text'
                        value={closing_hours}
                        onChange={(e) => setClosing_hours(e.target.value)}
                        required
                        />
                    </label>    
                </div>
                <div className='create-image'>
                    <label className='create-label'>
                        Cover Image
                        <input
                        className='create-input'
                        type='text'
                        value={cover_image}
                        onChange={(e) => setCover_image(e.target.value)}
                        required
                        />
                    </label>   
                </div>
                <button className='create-button' type="submit">Add Restaurant</button>
                </form>
            </div>
    )
}

export default CreateRestaurant;
