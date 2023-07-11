import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addRestaurants } from '../../store/restaurant';

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

    const dispatch = useDispatch();
    const history = useHistory();

    const handleAddRestaurant = (e) => {
        const newRestaurant = {
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
        dispatch(addRestaurants(newRestaurant));
        history.push('/restaurants');
    }

    return (
        <div className='restaurant-form-container'>
            <h1>Add Your Restaurant</h1>
            <form >
            <label>
                Restaurant Name
                <input
                type='text'
                value={restaurant_name}
                onChange={(e) => setRestaurant_name(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Email
                <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Phone Number
                <input
                type='number'
                value={phone_number}
                onChange={(e) => setPhone_number(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                City
                <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                State
                <input
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Address
                <input
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Zip Code
                <input
                type='number'
                value={zip_code}
                onChange={(e) => setZip_code(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Country
                <input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Cuisine Type
                <select
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
            <br />
            <label>
                Price Range
                <select
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
            <br />
            <label>
                Open Hours
                <input
                type='text'
                value={open_hours}
                onChange={(e) => setOpen_hours(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Closing Hours
                <input
                type='text'
                value={closing_hours}
                onChange={(e) => setClosing_hours(e.target.value)}
                required
                />
            </label>
            <br />
            <label>
                Cover Image
                <input
                type='text'
                value={cover_image}
                onChange={(e) => setCover_image(e.target.value)}
                required
                />
            </label>
            <br />
            <button type="submit">Add Restaurant</button>
            </form>
        </div>
    )
}

export default CreateRestaurant;
