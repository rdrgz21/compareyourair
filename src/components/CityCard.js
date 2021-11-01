import React from 'react';
import styles from './CityCard.module.css';

const CityCard = ({location, index, deleteLocation}) => {
    const {name, city, lastUpdated, parameters} = location;

    console.log(location);

    return (
        <div className={styles.container} onClick={() => deleteLocation(index)}>
            {name}
        </div>
    )
}

export default CityCard
