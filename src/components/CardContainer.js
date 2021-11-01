import React, {useState, useEffect} from 'react';
import { checkDuplicates } from '../helpers';
import styles from './CardContainer.module.css';
import CityCard from './CityCard';
import { usePrevious } from '../usePrevHook';

const CardContainer = ({locations}) => {

    const [displayedLocations, setDisplayedLocations] = useState([]);

    // const prevLocations = usePrevious(locations);

    // useEffect(() => {
    //     const newLocation = locations[locations.length - 1];
    //    if (prevLocations){
    //     const isNotDuplicate = checkDuplicates(newLocation, prevLocations);
    //     if (isNotDuplicate) {
    //         setDisplayedLocations(prev => [...prev, newLocation])
    //     } else {
    //         console.log('Location card already saved');
    //     }
    //    }
    // }, [locations]);

    return (
        <div className={styles.container}>
            {displayedLocations.map((location, index) => <CityCard location={location} key={index} />)}
        </div>
    )
}

export default CardContainer
