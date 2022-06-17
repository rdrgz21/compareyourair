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
    const {data, loading, error} = useFetch(clickedCity ? `${baseUrl}/v1/locations?country_id=gb&city=${clickedCity}&order_by=random` : '');

    const {allCities, savedLocations} = state;

    const saveNewLocation = useCallback((newLocationData) => {
        const randomIndex = generateRandomIndex(newLocationData);
        const newLocation = newLocationData.length > 1 ? newLocationData[randomIndex] : newLocationData[0];
        const isNotDuplicate = checkDuplicates(newLocation, savedLocations);

        if (isNotDuplicate) {
            dispatch({type: ACTIONS.SET_SAVED_LOCATIONS, payload: [...savedLocations, newLocation]});
        } else {
            dispatch({message: ACTIONS.SET_MESSAGE, payload: `Data for ${newLocationData.name} is already displayed`})
        }
    }, [dispatch, savedLocations]);

    useEffect(() => {
        dispatch({type: ACTIONS.SET_MESSAGE, payload: ''});

        if (error) {
            dispatch({type: ACTIONS.SET_MESSAGE, payload: error})
        }

        if ((clickedCity && !data) || (clickedCity && data && !data.results.length)) {
            dispatch({type: ACTIONS.SET_MESSAGE, payload: `No data for ${clickedCity} currently available`});
            return;
        }

        if (clickedCity && data && data.results && clickedCity === data.results[0].city) {
            const locationData = data.results;
            saveNewLocation(locationData);
        }

        // Reset clicked city at end of effect
        if (!loading) {
            setClickedCity(null);
        }
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
