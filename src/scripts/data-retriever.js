// The location parameter will contain an array of two items. Either [city, state],
// or [latitude, longitude] if the user provides their coordinates. Both are valid ways
// to retrieve weather information.
const fetchWeatherInfo = (location) => {
  try {
    return loadJson(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.city},${location.state}/next6days?key=KGKY4HECU7WY8LDG23LNV232C&include=days,hours&elements=temp,tempmax,tempmin,feelslike,icon,datetime`,
    );
  } catch (error) {
    // If the request failed due to a server error, the application should attempt
    // to request the weather info again.
    if (error === 500) {
      return fetchWeatherInfo(location);
    }
    throw new Error("Location Not Found", { cause: error });
  }
};

// If coordinates are used to retrieve weather information, the corresponding address to
// those coordinates will need to be obtained so that they can be displayed.
const fetchUserAddress = (position) => {
  try {
    return loadJson(
      `https://api.tomtom.com/search/2/reverseGeocode/${position.coords.latitude},${position.coords.longitude}}.json?key=DriIcScbvrUfDbEU1DyR0eyp3J3VjBk6`,
    );
  } catch (error) {
    if (error === 500 || error === 504) {
      return fetchUserAddress(position);
    }
    throw new Error("Address Not Found", { cause: error });
  }
};

const getUserCoordinates = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          // If the request failed due to an internal error, the application should attempt
          // to request the user coordinates again.
          if (error.code !== 1) {
            return getUserCoordinates();
          }
        },
      );
    } else {
      reject(new Error("Coordinates Unobtainable"));
    }
  });
};

async function loadJson(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.status);
}

export { fetchWeatherInfo, getUserCoordinates, fetchUserAddress };
