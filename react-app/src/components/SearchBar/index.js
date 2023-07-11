import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import "./SearchBar.css"
function SearchBar () {
    // const [ date, setDate ] = useState( "" );
    const [ city, setCity ] = useState( "" );
    const [ cuisine, setCuisine ] = useState( "" );
    const [ date, setDate ] = useState( "" );
    const [ time, setTime ] = useState( "" );
    // const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = ( e ) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();
        if ( city ) {
            queryParams.append( "city", city );
        }
        if ( cuisine ) {
            queryParams.append( "type", cuisine );
        }

        const queryString = queryParams.toString();
        history.push( `/restaurants${ queryString ? `?${ queryString }` : "" }` );
    };

    return (
        <form className="search-form-container" onSubmit={ handleSubmit }>


            <label className="date" htmlFor="date">Date:</label>
            <input
                type="date"
                id="date"
                value={ date }
                onChange={ ( e ) => setDate( e.target.value ) }
            />

            <label className="time" htmlFor="time">Time:</label>
            <input
                type="time"
                id="time"
                value={ time }
                onChange={ ( e ) => setTime( e.target.value ) }
            />

            <label className="city" htmlFor="city">City:</label>
            <select
                id="city"
                value={ city }
                onChange={ ( e ) => setCity( e.target.value ) }
            >
                <option value="">Select City</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Orlando">Orlando</option>
                <option value="Houston">Houston</option>
            </select>

            <label className="food-type" htmlFor="cuisine">Cuisine Type:</label>
            <select
                id="cuisine"
                value={ cuisine }
                onChange={ ( e ) => setCuisine( e.target.value ) }
            >
                <option value="">Select Cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Mexican">Mexican</option>
                <option value="Japanese">Japanese</option>
                <option value="American">American</option>
                <option value="Indian">Indian</option>
                <option value="Thai">Thai</option>
                <option value="Spanish">Spanish</option>
                <option value="Ethiopian">Ethiopian</option>
                <option value="Greek">Greek</option>
            </select>

            <button className="table-button" type="submit">Find a table</button>
        </form>
    );
}

export default SearchBar;
