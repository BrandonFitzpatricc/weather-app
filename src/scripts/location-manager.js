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

const closeCurrentOpenLocation = () => {
  locations.find((location) => location.isOpen).isOpen = false;
};

const getLocations = () => {
    return locations;
}

const atMaxLocations = () => locations.length === 10;

export { addLocation, deleteLocation, findLocation, closeCurrentOpenLocation, getLocations, atMaxLocations }
