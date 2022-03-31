import React, {useState, useEffect, useCallback} from 'react';
import styles from './App.module.css';
import axios from 'axios';
import { baseUrl, generateRandomIndex, checkDuplicates, removeValueFromArray } from './helpers';
import Title from './components/Title';
import AutoCompleteSearch from './components/AutoCompleteSearch';
import CityCard from './components/CityCard';

function App() {
  const [clickedCity, setClickedCity] = useState(null);
  const [newLocationData, setNewLocationData] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState('');

  // Effect for when new city clicked
  useEffect(() => {
    // Fetch data - if multiple locations for chosen city found, chooses random
    const fetchLocationData = async (clickedCity) => {
      try {
        const res = await axios.get(`${baseUrl}/v2/locations?country_id=gb&city=${clickedCity}&order_by=random`, { crossdomain: true });
        const locationData = res.data.results;
        if (clickedCity && locationData.length) {
          const randomIndex = generateRandomIndex(locationData);
          const newLocation = locationData.length > 1 ? locationData[randomIndex] : locationData[0];
          if (typeof newLocation !== 'undefined') {
            setNewLocationData(newLocation);
          }
        } else {
          // If no data for chosen city available, inform user
          setMessage(`No data for ${clickedCity} currently avaiable`);
        }
      } catch {
          console.error('There was an error');
      }
    };
    // If new city clicked, remove any displayed message and fetch data
    if (clickedCity) {
      setMessage(null);
      fetchLocationData(clickedCity);
    }
    // Reset clicked city at end of effect
    setClickedCity(null);
  }, [clickedCity, message]);

  // Effect when new location data retrieved or user deletes card
  useEffect(() => {
    // If deleting last shown card, reset everything
    if (isDeleting && savedLocations.length === 0) {
      setNewLocationData(null);
      setSavedLocations([]);
      setIsDeleting(false);
      return;
    }
    // Check for duplicates in saved locations
    const isNotDuplicate = newLocationData ? checkDuplicates(newLocationData, savedLocations) : false;
    // If not duplicate then add to saved locations
    if (newLocationData && isNotDuplicate) {
        setSavedLocations(prev => [...prev, newLocationData]);
        setNewLocationData(null);
    } 
    // If duplicate then display message to inform user
    if (!isNotDuplicate && newLocationData) {
      setMessage(`Data for ${newLocationData.name} is already displayed`)
      setNewLocationData(null);
    }
  }, [newLocationData, savedLocations, isDeleting]);

  // Delete location from saved
  const deleteLocation = useCallback((index) => {
    setIsDeleting(true);
    setMessage(null);
    if (savedLocations.length === 1 && index === 0) {
      setSavedLocations([]);
    }
    const updatedSavedLocations = removeValueFromArray(index, savedLocations);
    setSavedLocations(updatedSavedLocations);
  },[savedLocations, setSavedLocations]);

  const reversedSavedLocations = savedLocations.reverse();

  return (
    <div className={styles.container}>
      <Title />
      <AutoCompleteSearch setClickedCity={setClickedCity} />
      <div className={styles.messageContainer}>
        <p>{message}</p>
      </div>
      <div className={styles.cardContainer}>
        {savedLocations && reversedSavedLocations.map((location, index) => <CityCard location={location} index={index} key={location} deleteLocation={deleteLocation} />)}
      </div>
    </div>
  );
}

export default App;
