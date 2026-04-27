import { addLocation } from "./location-manager";

const processWeatherInfo = (weatherInfo) => {
  return weatherInfo.days;
};

const processUserAddress = (userAddress) => {
  userAddress = userAddress.addresses[0].address;
  const city = userAddress.localName;
  const state = userAddress.countySubdivisionCode;
  addLocation(city, state, true);
  return { city, state };
};

export { processWeatherInfo, processUserAddress };
