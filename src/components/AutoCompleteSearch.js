import React, {useState, useEffect} from 'react';
import styles from './AutoCompleteSearch.module.css';
import {filterCities, baseUrl, createCitiesArray } from '../helpers';
import axios from 'axios';
import searchIcon from '../images/search.png'

const AutoCompleteSearch = ({setClickedCity}) => {
    const [cities, setCities] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchCityList = async () => {
            const res = await axios.get(`${baseUrl}/v1/cities?limit=10000&page=1&offset=0&sort=asc&country_id=gb&order_by=city`, { crossdomain: true });
            const cityArray = createCitiesArray(res.data.results);
            setCities(cityArray);
        }
        fetchCityList();
    }, []);

    const onChangeHandler = (event) => {
        const filteredCities = filterCities(event, cities);
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
