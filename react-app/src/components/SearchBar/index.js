import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import "./SearchBar.css"

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String( today.getMonth() + 1 ).padStart( 2, "0" );
    const day = String( today.getDate() ).padStart( 2, "0" );
    return `${ year }-${ month }-${ day }`;
};

const getOneHourFromNow = () => {
    const currentTime = new Date();
    currentTime.setHours( currentTime.getHours() + 1 );
    currentTime.setMinutes( Math.ceil( currentTime.getMinutes() / 30 ) * 30 ); // Round up to next 30-minute increment
    const hours = String( currentTime.getHours() ).padStart( 2, "0" );
    const minutes = String( currentTime.getMinutes() ).padStart( 2, "0" );
    return `${ hours }:${ minutes }`;
};

function SearchBar () {
    const [ city, setCity ] = useState( "" );
    const [ cuisine, setCuisine ] = useState( "" );
    const [ date, setDate ] = useState( getTodayDate() );
    const [ time, setTime ] = useState( getOneHourFromNow() );
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
        <form onSubmit={ handleSubmit }>


            <label className="date">Date:
                <input
                    className="dateinput"
                    type="date"
                    id="date"
                    value={ date }
                    onChange={ ( e ) => setDate( e.target.value ) }
                />
            </label>

            <label className="time" >Time:</label>
            <input
                className="timeinput"
                type="time"
                id="time"
                value={ time }
                onChange={ ( e ) => setTime( e.target.value ) }
            />


            <label className="city" htmlFor="city">City:</label>
            <select
                className="cityinput"
                id="city"
                value={ city }
                onChange={ ( e ) => setCity( e.target.value ) }
            >
                <option value="">Search by City</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Orlando">Orlando</option>
                <option value="Houston">Houston</option>
            </select>

            <label className="food-type" htmlFor="cuisine">Cuisine Type:</label>
            <select
                className="typeinput"
                id="cuisine"
                value={ cuisine }
                onChange={ ( e ) => setCuisine( e.target.value ) }
            >
                <option value="">Search by Cuisine</option>
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

            <button type="submit">Find a table</button>
        </form>
    );
}

export default SearchBar;
