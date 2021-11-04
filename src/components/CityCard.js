import React from 'react';
import styles from './CityCard.module.css';
import closeIcon from '../images/close.png';
import { parseParameters } from '../helpers';
import TimeAgo from 'timeago-react';

const CityCard = ({location, index, deleteLocation}) => {
    const {name, city, lastUpdated, parameters} = location;

    const parameterValues = parseParameters(parameters);

    return (
        <div className={styles.container} >
            <img src={closeIcon} alt='closeIcon' onClick={() => deleteLocation(index)} />
            <p className={styles.lastUpdatedText}>Updated  <TimeAgo datetime={lastUpdated} locale='en_GB' /></p>
            <h3>{name}</h3>
            <p>in {city}, United Kingdom</p>
            <p className={styles.values}>Values: {parameterValues}</p>
        </div>
    )
}

export default CityCard
