const fetchWeatherInfo = async (location) => {
  try {
    return await loadJson(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.city},${location.state}/next6days?key=KGKY4HECU7WY8LDG23LNV232C&include=days,hours&elements=temp,tempmax,tempmin,feelslike,icon,datetime`,
    );
  } catch (error) {
    // If the request failed due to a server or network error, rather than an
    // invalid request, then the application should attempt to request the weather info again.
    if (error.message !== "400") {
      return fetchWeatherInfo(location);
    } else {
      throw new Error("Location not found.", { cause: error });
    }
  }
};

// If the application is able to retrieve the user's position, then it will use that position
// to retrieve their address, which will be used for displaying city/state and retrieving
// weather information.
const fetchUserAddress = async (position) => {
  try {
    return await loadJson(
      `https://api.tomtom.com/search/2/reverseGeocode/${position.coords.latitude},${position.coords.longitude}}.json?key=DriIcScbvrUfDbEU1DyR0eyp3J3VjBk6`,
    );
  } catch {
    // If the request failed due to a server or network error, the application should attempt
    // to request the user address again.
    return fetchUserAddress(position);
  }
};

const getUserPosition = async () => {
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
          reject(new Error("Location permission rejected."));
        },
      );
    } else {
      reject(new Error("Position cannot be retrieved."));
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
