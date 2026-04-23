const fetchWeatherInfo = async (location) => {
  try {
    return loadJson(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location[0]},${location[1]}/next6days?key=KGKY4HECU7WY8LDG23LNV232C&include=days,hours&elements=temp,tempmax,tempmin,feelslike,icon,datetime`,
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

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve([position.coords.latitude, position.coords.longitude]),
        (error) => {
          // If the request failed due to an internal error, the application should attempt
          // to request the user location again.
          if (error.code !== 1) {
            return getUserLocation();
          }
          reject(new Error("Location Permission Rejected"));
        },
      );
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

export { fetchWeatherInfo, getUserLocation };
