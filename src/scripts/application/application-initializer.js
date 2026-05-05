import {
  handleUserLocationWeatherInfo,
  handleOpenLocationWeatherInfo,
} from "./data-handler";
import { handleLoadError } from "../utilities/error-handler";
import { loadLocations } from "./location-manager";
import { displayErrorMessage } from "../ui/error-message-handler";
import { loadCurrentTempScale } from "../utilities/temp-scale-manager";
import { toggleLoader } from "../ui/load-display-handler";

const startup = async () => {
  loadLocations();
  loadCurrentTempScale();
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
      // If the application already has user location permissions on startup, then it should
      // attempt to retrieve and display the weather information for the user's location.
      handleLoadError(handleUserLocationWeatherInfo, () =>
        // The weather information for the most recently viewed location (set to NYC on initial
        // startup) will be retrieved and displayed as a fallback if the application fails to
        // retrieve the user's location.
        handleLoadError(handleOpenLocationWeatherInfo, () => {
          displayErrorMessage();
          toggleLoader("#loader", "not visible");
        }),
      );
    } else {
      // If the application is either awaiting user location permissions or they have been
      // denied, then it should attempt to retrieve and display the weather information for
      // the most recently viewed location (set to NYC on initial startup).
      handleLoadError(handleOpenLocationWeatherInfo, () => {
        displayErrorMessage();
        toggleLoader("#loader", "not visible");
      });

      // Once (or if), the application receives user location permissions, it should attempt
      // to retrieve and display the weather information for the user's location.
      handleLoadError(handleUserLocationWeatherInfo, () =>
        console.log(
          "Weather information could not be retrieved for this location.",
        ),
      );
    }
  });
};

export { startup };
