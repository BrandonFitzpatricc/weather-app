import { serveOpenLocationWeatherInfo } from "./data-controller";
import { openNewLocationPrompt } from "./new-location-prompt-controller";

import { deleteLocation, openLocation } from "../model/location-manager";
import { handleLoadError } from "../model/utilities/error-handler";

import { displayErrorMessage } from "../view/utilities/error-message-handler";
import { updateLocationsSidebar } from "../view/locations-sidebar";
import { displayNewLocationPrompt } from "../view/new-location-prompt";
import { hideLoader } from "../view/utilities/load-display-handler";

const locationsSidebar = document.querySelector("#locations-sidebar");

const showLocationsSidebar = () => {
  locationsSidebar.className = "locations-sidebar";
};

const hideLocationsSidebar = () => {
  locationsSidebar.className = "locations-sidebar hidden";
};

locationsSidebar.addEventListener("click", (event) => {
  const selectedButton = event.target;

  const buttonHandler = {
    "close-sidebar-btn": hideLocationsSidebar,

    "location-btn": () => {
      openLocation(selectedButton.parentElement.dataset.id);
      handleLoadError(serveOpenLocationWeatherInfo, () => {
        displayErrorMessage();
        hideLoader("#main-content-loader");
      });

      hideLocationsSidebar();
    },

    "delete-location-btn": () => {
      deleteLocation(selectedButton.parentElement.dataset.id);
      updateLocationsSidebar();
    },

    "add-location-btn": () => {
      hideLocationsSidebar();
      displayNewLocationPrompt();
      openNewLocationPrompt();
    },
  };

  buttonHandler[selectedButton.className]();
});

export { showLocationsSidebar, hideLocationsSidebar };
