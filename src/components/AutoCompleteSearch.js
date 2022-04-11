import React, {useState, useEffect, useContext, useCallback} from 'react';
import styles from './AutoCompleteSearch.module.css';
import {filterCities, baseUrl, generateRandomIndex, checkDuplicates} from '../helpers';
import useFetch from '../hooks/useFetch';
import searchIcon from '../images/search.png'
import { ACTIONS, Context } from '../App';

const AutoCompleteSearch = () => {
    const [results, setResults] = useState([]);
    const [clickedCity, setClickedCity] = useState(null);
    const {state, dispatch} = useContext(Context);
    const {data, loading, error} = useFetch(`${baseUrl}/v2/locations?country_id=gb&city=${clickedCity}&order_by=random`);

    const {allCities, savedLocations} = state;

    const saveNewLocation = useCallback((newLocationData) => {
        const randomIndex = generateRandomIndex(newLocationData);
        const newLocation = newLocationData.length > 1 ? newLocationData[randomIndex] : newLocationData[0];
        const isNotDuplicate = checkDuplicates(newLocationData, savedLocations);

        if (isNotDuplicate) {
            if (typeof newLocation !== 'undefined') {
                dispatch({type: ACTIONS.SET_NEW_LOCATION_DATA, payload: newLocation});
            }
        } else {
            dispatch({message: ACTIONS.SET_MESSAGE, payload: `Data for ${newLocationData.name} is already displayed`})
        }
    }, [dispatch, savedLocations]);

    useEffect(() => {
        dispatch({type: ACTIONS.SET_MESSAGE, payload: ''});

        if (loading) return;

        if (error) {
            dispatch({type: ACTIONS.SET_MESSAGE, payload: error})
        }

        if (clickedCity && data) {
            const locationData = data.results;
            saveNewLocation(locationData);
        } else if (clickedCity && !data) {
            dispatch({type: ACTIONS.SET_MESSAGE, payload: `No data for ${clickedCity} currently avaiable`})
        }
        // Reset clicked city at end of effect
        setClickedCity(null);
      }, [clickedCity, data, dispatch, error, loading, saveNewLocation]);

    const onChangeHandler = (event) => {
        const filteredCities = filterCities(event, allCities);
        setResults(filteredCities);
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <span>
                    <img src={searchIcon} alt="svgImg" />
                </span>    
                <input type='text' placeholder='Enter city name...' onChange={onChangeHandler} />
            </div>
            {results && 
                <ul>
                    {results.map((city, index) => <li onClick={() => setClickedCity(city)} key={index}>{city}</li>)}
                </ul>}
        </div>
    )
}

export default AutoCompleteSearch
