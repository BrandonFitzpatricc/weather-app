import { getLocations } from "./location-manager";
import { createLocationTab } from "./element-factory";

const locationsSidebar = document.querySelector("#locations-sidebar");
const newLocationTab = document.querySelector("#new-location-tab");

const updateLocationsSidebar = () => {
  locationsSidebar.querySelectorAll(".tab.location").forEach(locationTab => {
    locationsSidebar.removeChild(locationTab);
  })

  getLocations().forEach((location) =>
    locationsSidebar.insertBefore(createLocationTab(location), newLocationTab),
  );
};

export { updateLocationsSidebar };
