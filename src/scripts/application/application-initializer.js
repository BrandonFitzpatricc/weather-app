import {
  handleUserLocationWeatherInfo,
  handleOpenLocationWeatherInfo,
} from "./data-handler";
import { handleStartupError } from "../utilities/error-handler";
import { loadLocations } from "./location-manager";
import { displayErrorMessage } from "../ui/error-message-handler";

const startup = async () => {
  loadLocations();
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
      // If the application already has user location permissions on startup, then it should
      // attempt to retrieve and display the weather information for the user's location.
      handleStartupError(handleUserLocationWeatherInfo, () =>
        // The weather information for the most recently viewed location (set to NYC on initial
        // startup) will be retrieved and displayed as a fallback if the application fails to
        // retrieve the user's location.
        handleStartupError(handleOpenLocationWeatherInfo, displayErrorMessage),
      );
    } else {
      // If the application is either awaiting user location permissions or they have been
      // denied, then it should attempt to retrieve and display the weather information for
      // the most recently viewed location (set to NYC on initial startup).
      handleStartupError(handleOpenLocationWeatherInfo, displayErrorMessage);

      // Once (or if), the application receives user location permissions, it should attempt
      // to retrieve and display the weather information for the user's location.
      handleStartupError(handleUserLocationWeatherInfo, () =>
        console.log(
          "Weather information could not be retrieved for this location.",
        ),
      );
    }
  });
};

export { startup };
