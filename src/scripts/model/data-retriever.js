import { handleFetchError } from "./utilities/error-handler";

const fetchWeatherInfo = async (location) => {
  for (let i = 1; i <= 5; i++) {
    const weatherInfo = await handleFetchError(
      fetchJson,
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location.city},${location.state}/next6days?key=KGKY4HECU7WY8LDG23LNV232C&include=days,hours&elements=temp,tempmax,tempmin,feelslike,icon,datetime,precipprob`,
      (error) => {
        if (error.message === "400" || i === 5) {
          // prettier-ignore
          throw new Error("Weather information could not be retrieved for this location")
        }
      },
    );

    if (weatherInfo instanceof Object) return weatherInfo;

    await delay(i * i * 1000);
  }
};

// If the application is able to retrieve the user's position, then it will use that position
// to retrieve their address, which will be used for displaying city/state and retrieving
// weather information.
const fetchUserAddress = async (position) => {
  for (let i = 1; i <= 5; i++) {
    const userAddress = await handleFetchError(
      fetchJson,
      `https://api.tomtom.com/search/2/reverseGeocode/${position.coords.latitude},${position.coords.longitude}}.json?key=DriIcScbvrUfDbEU1DyR0eyp3J3VjBk6`,
      () => {
        if (i === 5) throw new Error("User address could not be obtained");
      },
    );

    if (userAddress instanceof Object) return userAddress;

    await delay(i * i * 1000);
  }
};

const getUserPosition = async () => {
  for (let i = 1; i <= 5; i++) {
    const userPosition = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => {
          if (error.code === 1 || i === 5) {
            reject(new Error("User position could not be obtained"));
          }
        },
      );
    });

    if (userPosition instanceof Object) return userPosition;

    await delay(i * i * 1000);
  }
};

async function fetchJson(url) {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.status);
}

async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { fetchWeatherInfo, getUserPosition, fetchUserAddress };
