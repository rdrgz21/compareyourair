// API REQUESTS

export const baseUrl = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com';

// SHAPING DATA

export const createCitiesArray = obj => {
    const newCitiesArray = [];
    obj.map(city => newCitiesArray.push(city.city));
    return newCitiesArray;
};

export const parseParameters = parameters => {
  if (parameters) {
    const values =  parameters.map(parameter => `${parameter.parameter}: ${parameter.lastValue}`);
    return values.join(', ').toUpperCase()
  } else {
    return 'No values available';
  }
}

export const removeValueFromArray = (index, array) => {
    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray
  }

export const generateRandomIndex = (obj) => {
    return Math.floor((Math.random() * obj.length));
}

// FILTERING AND CHECKING

export const filterCities = (event, cities) => {
    const searchTerm = event.target.value;
    if (searchTerm.length === 0) {
        return null;
    }
    if (cities) {
        const filteredCities = cities.filter(city => city.toLowerCase().startsWith(searchTerm.toLowerCase()));
        return filteredCities;
    }
} 

export const checkDuplicates = (newLocation, savedLocations) => {
    const isNotDuplicate = savedLocations.every(savedLocation => savedLocation.name !== newLocation.name);
    return isNotDuplicate;
}