// API REQUESTS

export const baseUrl = 'https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com';

// export const fetchCityList = async () => {
//     const res = await axios.get(`${baseUrl}/v1/cities?limit=10000&page=1&offset=0&sort=asc&country_id=gb&order_by=city`, { crossdomain: true });
//     // createCitiesArray(res.data.results);
//     return res.data.results;
// };

// export const fetchLocationData = async (clickedCity) => {
//     const res = await axios.get(`${baseUrl}/v2/locations?country_id=gb&city=${clickedCity}&order_by=random`, { crossdomain: true });
//     return res.data.results;
// };

// SHAPING DATA

export const createCitiesArray = obj => {
    const newCitiesArray = [];
    obj.map(city => newCitiesArray.push(city.city));
    return newCitiesArray;
    // setCities(newCitiesArray);
};

export const shapeLocationData = location => {
  if (location.parameters) {
    const valuesArray = location.parameters.map(parameter => `${parameter.parameter}: ${parameter.lastValue}`);

    const locationData = {
      name: location.name,
      city: location.city,
      lastUpdated: location.lastUpdated,
      values: valuesArray
    };
    return locationData;
  } else {
    console.log('Messed up');
  }
}

export const generateRandomIndex = (obj) => {
    return Math.floor((Math.random() * obj.length) + 1);
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
    console.log({newLocation});
    // console.log({savedLocations});
    const isNotDuplicate = savedLocations.every(savedLocation => savedLocation.name !== newLocation.name);
    console.log({isNotDuplicate});
    return isNotDuplicate;
}

// MANAGING

export const getShapedLocationData = (locationData, savedLocations) => {
    if (!locationData.length) {
        console.log('No data available');
    } else if (locationData.length > 1) {
        console.log('MULTIPLE RESULTS');
        const randomIndex = generateRandomIndex(locationData);
        // checkDuplicates(locationData[randomIndex]) ? setSavedLocations(prev => [...prev, locationData[randomIndex]]) : console.log('Already saved');
        // if (checkDuplicates(locationData[randomIndex], savedLocations)) {
        //     return locationData[randomIndex]
        // } else {
        //     console.log('Already saved');
        // } 
        return checkDuplicates(locationData[randomIndex], savedLocations)
    } else {
        // console.log(locationData[0]);
        // checkDuplicates(locationData[0], savedLocations) ?  locationData[0] : console.log('Already saved');
        return checkDuplicates(locationData[0], savedLocations)
    }
};

export const removeValueFromArray = (index, array) => {
    const newArray = [...array];
    console.log({array});
    newArray.splice(index, 1);
    return newArray
  }