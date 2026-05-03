import { Location } from "./location";
import { storageAvailable } from "../utilities/storage-handler";

let locations = [new Location("New York", "New York", true)];

const addLocation = (city, state, isOpen) => {
  // There's a possibility that an attempt is made to add a location that has already
  // been added. This location should be opened, but not added again.
  const location = locations.find(
    (location) => location.city === city && location.state === state,
  );
  if (!location) {
    if (isOpen) closeOpenLocation();
    locations.push(new Location(city, state, isOpen));
  } else {
    openLocation(location.id);
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

const openLocation = (id) => {
  closeOpenLocation();
  findLocation(id).isOpen = true;
};

const getOpenLocation = () => {
  let openLocation = locations.find((location) => location.isOpen);
  // The first location in the list should be opened if no other location is currently open.
  if (!openLocation && locations.length !== 0) {
    openLocation = locations[0];
    openLocation.isOpen = true;
  }
  return openLocation;
};

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
  const savedLocations = JSON.parse(localStorage.getItem("locations"));
  // console.log(savedLocations);
  if (savedLocations && savedLocations.length !== 0) {
    locations = [];
    savedLocations.forEach((location) => {
      location = JSON.parse(location);
      addLocation(location.city, location.state, location.isOpen);
    });
  }
};

// This will always run prior to the user opening a new location.
function closeOpenLocation() {
  const openLocation = getOpenLocation();
  if (openLocation) openLocation.isOpen = false;
}

export {
  addLocation,
  deleteLocation,
  findLocation,
  openLocation,
  getOpenLocation,
  closeOpenLocation,
  getLocations,
  atMaxLocations,
  saveLocations,
  loadLocations,
};
