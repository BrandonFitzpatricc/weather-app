import { getLocations } from "../application/location-manager";
import { createLocationTab } from "./element-factory";
import {
  deleteLocation,
  openLocation,
  atMaxLocations,
} from "../application/location-manager";
import { handleOpenLocationWeatherInfo } from "../application/data-handler";
import { toggleForm } from "./form-controller";
import { handleLoadError } from "../utilities/error-handler";
import { displayErrorMessage } from "./error-message-handler";
import { toggleLoader } from "./load-display-handler";

const locationsSidebar = document.querySelector("#locations-sidebar");
const newLocationTab = document.querySelector("#new-location-tab");

const updateLocationsSidebar = () => {
  locationsSidebar.querySelectorAll(".tab.location").forEach((locationTab) => {
    locationsSidebar.removeChild(locationTab);
  });

  getLocations().forEach((location) =>
    locationsSidebar.insertBefore(createLocationTab(location), newLocationTab),
  );

  if (atMaxLocations()) {
    newLocationTab.className = "tab new-location hidden";
  } else {
    newLocationTab.className = "tab new-location";
  }
};

const toggleLocationsSidebar = () => {
  locationsSidebar.className = locationsSidebar.className.includes("hidden")
    ? "locations-sidebar"
    : "locations-sidebar hidden";
};

locationsSidebar.addEventListener("click", (event) => {
  const selectedButton = event.target;

  const buttonHandler = {
    "close-sidebar-btn": toggleLocationsSidebar,
    "location-btn": () => {
      openLocation(selectedButton.parentElement.dataset.id);
      handleLoadError(handleOpenLocationWeatherInfo, () => {
        displayErrorMessage();
        toggleLoader("#loader", "not visible");
      });
      toggleLocationsSidebar();
    },
    "delete-location-btn": () => {
      deleteLocation(selectedButton.parentElement.dataset.id);
      updateLocationsSidebar();
    },
    "add-location-btn": () => {
      toggleLocationsSidebar();
      toggleForm();
    },
  };

  buttonHandler[selectedButton.className]();
});

export { updateLocationsSidebar, toggleLocationsSidebar };
