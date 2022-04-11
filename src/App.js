import React, {createContext, useReducer, useEffect} from 'react';
import styles from './App.module.css';
import { baseUrl, createCitiesArray, removeValueFromArray} from './helpers';
import Title from './components/Title';
import AutoCompleteSearch from './components/AutoCompleteSearch';
import CityCard from './components/CityCard';
import useFetch from './hooks/useFetch';

export const Context = createContext();

const initialState = {
  allCities: [],
  savedLocations: [],
  message: null
}

export const ACTIONS = {
  SET_ALL_CITIES: 'SET_ALL_CITIES',
  SET_SAVED_LOCATIONS: 'SET_CHARACTERS',
  SET_MESSAGE: 'SET_TONES',
  DELETE_CITY: 'DELETE_CITY'
}

const reducer = (state, action) => {
  switch (action.type) {
      case ACTIONS.SET_ALL_CITIES:
        return {...state, allCities: action.payload}
      case ACTIONS.SET_SAVED_LOCATIONS:
          return {...state, savedLocations: action.payload};
      case ACTIONS.DELETE_CITY:
        const updatedSavedLocations = removeValueFromArray(action.payload, state.savedLocations);
        return {...state, savedLocations: updatedSavedLocations, message: ''}
      case ACTIONS.SET_MESSAGE:
          return {...state, message: action.payload}; 
      default:
          return state;    
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {data, loading} = useFetch(`${baseUrl}/v1/cities?limit=10000&page=1&offset=0&sort=asc&country_id=gb&order_by=city`);

  const {allCities, savedLocations, message} = state;

  useEffect(() => {
    if (loading && !allCities) {
        return;
    } 
    if (data && !allCities.length) {
        const citiesArray = createCitiesArray(data.results);
        dispatch({type: ACTIONS.SET_ALL_CITIES, payload: citiesArray});
    }
}, [data, loading, allCities]);

  return (
    <Context.Provider value={{state: state, dispatch: dispatch}}>
      <div className={styles.container}>
        <Title />
        {loading && !allCities ? <h1>Loading...</h1> : <AutoCompleteSearch />}
        {/* <AutoCompleteSearch /> */}
        <div className={styles.messageContainer}>
          {message && <p>{message}</p>}
        </div>
        <div className={styles.cardContainer}>
          {savedLocations && savedLocations.map((location, index) => <CityCard location={location} index={index} key={location.id} />)}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
