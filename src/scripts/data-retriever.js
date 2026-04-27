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

// If the application is able to retrieve the user's position, then it will use that position
// to retrieve their address, which will be used for displaying city/state and retrieving
// weather information.
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

const getUserPosition = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          // If the request failed due to an internal error, the application should attempt
          // to request the user position again.
          if (error.code !== 1) {
            return getUserPosition();
          }
        },
      );
    } else {
      reject(new Error("Position Unobtainable"));
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

export { fetchWeatherInfo, getUserPosition, fetchUserAddress };
