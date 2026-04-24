import { Location } from "./location";

const locations = [];

const addLocation = (city, state, isOpen) => {
  locations.push(new Location(city, state, isOpen));
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

// This will always run prior to the user opening a new location.
const closeCurrentOpenLocation = () => {
  locations.find((location) => location.isOpen).isOpen = false;
};

// The output of this function will be read by the locations sidebar controller and used for
// creating location tabs
const getLocations = () => {
    return locations;
}

const atMaxLocations = () => locations.length === 10;

export { addLocation, deleteLocation, findLocation, closeCurrentOpenLocation, getLocations, atMaxLocations }
