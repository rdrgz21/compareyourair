import React, {useContext} from 'react';
import styles from './CityCard.module.css';
import closeIcon from '../images/close.png';
import { parseParameters } from '../helpers';
import TimeAgo from 'timeago-react';
import { Context, ACTIONS } from '../App';

const CityCard = ({location, index}) => {
    const {dispatch} = useContext(Context);
    const {name, city, lastUpdated, parameters} = location;

    const parameterValues = parseParameters(parameters);

    return (
        <div className={styles.container} >
            <img src={closeIcon} alt='closeIcon' onClick={() => dispatch({type: ACTIONS.DELETE_CITY, payload: index})} />
            <p className={styles.lastUpdatedText}>Updated  <TimeAgo datetime={lastUpdated} locale='en_GB' /></p>
            <h3>{name}</h3>
            <p>in {city}, United Kingdom</p>
            <p className={styles.values}>Values: {parameterValues}</p>
        </div>
    )
}

export default CityCard
