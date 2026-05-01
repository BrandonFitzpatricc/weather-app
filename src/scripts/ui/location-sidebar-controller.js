import { getLocations } from "../application/location-manager";
import { createLocationTab } from "./element-factory";

const locationsSidebar = document.querySelector("#locations-sidebar");
const newLocationTab = document.querySelector("#new-location-tab");

const updateLocationsSidebar = () => {
  locationsSidebar.querySelectorAll(".tab.location").forEach((locationTab) => {
    locationsSidebar.removeChild(locationTab);
  });

  getLocations().forEach((location) =>
    locationsSidebar.insertBefore(createLocationTab(location), newLocationTab),
  );
};

const toggleLocationsSidebar = () => {
  locationsSidebar.className = locationsSidebar.className.includes("hidden")
    ? "locations-sidebar"
    : "locations-sidebar hidden";
};

locationsSidebar.addEventListener("click", (event) => {
  const selectedButton = event.target;

  const buttonHandler = {
    "close-sidebar-btn": () => {
      toggleLocationsSidebar();
    },
  };

  buttonHandler[selectedButton.className]();
});

export { updateLocationsSidebar, toggleLocationsSidebar };
