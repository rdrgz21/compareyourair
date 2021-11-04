import React from 'react';
import styles from './CityCard.module.css';
import closeIcon from '../images/close.png';
import { parseParameters } from '../helpers';

const CityCard = ({location, index, deleteLocation}) => {
    const {name, city, lastUpdated, parameters} = location;

    const parameterValues = parseParameters(parameters);

    return (
        <div className={styles.container} >
            <img src={closeIcon} alt='closeIcon' onClick={() => deleteLocation(index)} />
            <p>{lastUpdated}</p>
            <h3>{name}</h3>
            <p>In {city}, United Kingdom</p>
            <p>Values: {parameterValues}</p>
        </div>
    )
}

export default CityCard
