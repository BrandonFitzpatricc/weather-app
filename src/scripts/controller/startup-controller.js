import {
  serveUserLocationWeatherInfo,
  serveOpenLocationWeatherInfo,
} from "./data-controller";

import { handleLoadError } from "../model/utilities/error-handler";
import { loadLocations } from "../model/location-manager";
import { loadCurrentTempScale } from "../model/temp-scale-manager";

import { displayErrorMessage } from "../view/utilities/error-message-handler";
import { hideLoader } from "../view/utilities/load-display-handler";

const startup = async () => {
  loadLocations();
  loadCurrentTempScale();
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
      // If the application already has user location permissions on startup, then it should
      // attempt to retrieve and display the weather information for the user's location.
      handleLoadError(serveUserLocationWeatherInfo, () =>
        // The weather information for the most recently viewed location (set to NYC on initial
        // startup) will be retrieved and displayed as a fallback if the application fails to
        // retrieve the user's location.
        handleLoadError(serveOpenLocationWeatherInfo, () => {
          displayErrorMessage();
          hideLoader("#main-content-loader");
        }),
      );
    } else {
      // If the application is either awaiting user location permissions or they have been
      // denied, then it should attempt to retrieve and display the weather information for
      // the most recently viewed location (set to NYC on initial startup).
      handleLoadError(serveOpenLocationWeatherInfo, () => {
        displayErrorMessage();
        hideLoader("#main-content-loader");
      });

      // Once (or if), the application receives user location permissions, it should attempt
      // to retrieve and display the weather information for the user's location.
      handleLoadError(serveUserLocationWeatherInfo, () =>
        hideLoader("#main-content-loader"),
      );
    }
  });
};

export { startup };
