import { Location } from "./location";
import { storageAvailable, storagePopulated } from "./storage-handler";

let locations = [new Location("New York", "New York", true)];

const addLocation = (city, state, isOpen) => {
  if (!locationAlreadyAdded(city, state)) {
    if (isOpen) closeOpenLocation();
    locations.push(new Location(city, state, isOpen));
  }
};

const deleteLocation = (id) => {
  locations.splice(
    locations.findIndex((location) => location.id === id),
    1,
  );
};

const findLocation = (id) => {
  return locations.find((location) => location.id === id);
};

const getOpenLocation = () => locations.find((location) => location.isOpen);

// The output of this function will be read by the locations sidebar controller and used for
// creating location tabs
const getLocations = () => {
  return locations;
};

const atMaxLocations = () => locations.length === 10;

const saveLocations = () => {
  if (storageAvailable("localStorage"))
    localStorage.setItem("locations", JSON.stringify(locations));
};

const loadLocations = () => {
  if (storagePopulated()) {
    locations = [];
    JSON.parse(localStorage.getItem("locations")).forEach((location) => {
      location = JSON.parse(location);
      addLocation(location.city, location.state, location.isOpen);
    });
  }
};

function locationAlreadyAdded(city, state) {
  return Boolean(
    locations.find(
      (location) => location.city === city && location.state === state,
    ),
  );
}

// This will always run prior to the user opening a new location.
function closeOpenLocation() {
  const openLocation = getOpenLocation();
  if (openLocation) openLocation.isOpen = false;
}

export {
  addLocation,
  deleteLocation,
  findLocation,
  getOpenLocation,
  closeOpenLocation,
  getLocations,
  atMaxLocations,
  saveLocations,
  loadLocations,
};
