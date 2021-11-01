import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import axios from 'axios';
import { baseUrl, generateRandomIndex, checkDuplicates, removeValueFromArray } from './helpers';
import AutoCompleteSearch from './components/AutoCompleteSearch';
import CityCard from './components/CityCard';

function App() {
  const [clickedCity, setClickedCity] = useState(null);
  const [newLocationData, setNewLocationData] = useState(null);
  const [savedLocations, setSavedLocations] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    console.log('Fetching data');
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
          console.log('No data available');
        }
      } catch {
          console.error('There was an error');
      }
    };
    fetchLocationData(clickedCity);
  }, [clickedCity]);

  useEffect(() => {
    console.log('NEW LOC/SAVEDLOC/ISDELETING')
    
    console.log({isDeleting});
    console.log(savedLocations.length);
    // To get rid of all cards
    if (isDeleting && savedLocations.length === 0) {
      console.log('deleting');
      setNewLocationData(null);
      setSavedLocations([]);
      setIsDeleting(false);
      return;
    }
    if (savedLocations[savedLocations.length - 1] === newLocationData) return;

    const isNotDuplicate = newLocationData ? checkDuplicates(newLocationData, savedLocations) : false;
    if (newLocationData && isNotDuplicate) {
        setSavedLocations(prev => [...prev, newLocationData]);
        setNewLocationData(null);
    } 
    if (!isNotDuplicate) {
      console.log('Duplicate');
    }
  }, [newLocationData, savedLocations, isDeleting]);

  const deleteLocation = useCallback((index) => {
    console.log('DELETING')
    setIsDeleting(true);
    if (savedLocations.length === 1 && index === 0) {
      setSavedLocations([]);
    }
    const updatedSavedLocations = removeValueFromArray(index, savedLocations);
    console.log({updatedSavedLocations});
    setSavedLocations(updatedSavedLocations);
    },[savedLocations, setSavedLocations]);

  return (
    <div className='container'>
      <h1>Compare your air</h1>
      <h2>Compare the air quality between cities in the UK.</h2>
      <h2>Select cities to compare using the search tool below.</h2>
      <AutoCompleteSearch setClickedCity={setClickedCity} />
      {/* <CardContainer locations={savedLocations} /> */}
      <div className='cardContainer'>
        {savedLocations && savedLocations.map((location, index) => <CityCard location={location} index={index} key={index} deleteLocation={deleteLocation} />)}
      </div>
    </div>
  );
}

export default App;
