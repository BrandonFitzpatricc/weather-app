import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "./data-retriever";
import { processWeatherInfo, processUserAddress } from "./data-processor";
import { getOpenLocation } from "./location-manager";
import { handleError } from "./error-handler";
import { closeOpenLocation, getLocations } from "./location-manager";

const startup = async () => {
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
      // If the application already has user location permissions on startup, then it should
      // attempt to retrieve and display the weather information for the user's location.
      handleError(loadUserLocationWeatherInfo, () =>
        // The weather information for the most recently viewed location (set to NYC on initial
        // startup) will be retrieved and displayed as a fallback if the application fails to
        // retrieve the user's location.
        handleError(loadOpenLocationWeatherInfo, () =>
          console.log("Weather information cannot be retrieved at this time."),
        ),
      );
    } else {
      // If the application is either awaiting user location permissions or they have been
      // denied, then it should attempt to retrieve and display the weather information for
      // the most recently viewed location (set to NYC on initial startup).
      handleError(loadOpenLocationWeatherInfo, () =>
        console.log("Weather information cannot be retrieved at this time."),
      );

      // Once (or if), the application receives user location permissions, it should attempt
      // to retrieve and display the weather information for the user's location.
      handleError(loadUserLocationWeatherInfo, () =>
        console.log(
          "Weather information could not be retrieved for this location.",
        ),
      );
    }
    console.log(getLocations());
  });
};

async function loadOpenLocationWeatherInfo() {
  const weatherInfo = await fetchWeatherInfo(getOpenLocation());
  console.log(processWeatherInfo(weatherInfo, "Celsius"));
}

async function loadUserLocationWeatherInfo() {
  const userPosition = await getUserPosition();
  const userAddress = processUserAddress(await fetchUserAddress(userPosition));
  console.log(processWeatherInfo(await fetchWeatherInfo(userAddress)));
  closeOpenLocation();
}

export { startup };
