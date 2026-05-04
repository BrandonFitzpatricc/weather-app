import { addLocation } from "./location-manager";
import { convertToFahrenheit } from "../utilities/temp-converter";
import { modifyTemps } from "../utilities/temp-modifier";
import { getCurrentTempScale } from "../utilities/temp-scale-manager";

const processWeatherInfo = (weatherInfo) => {
  const days = weatherInfo.days;
  // Temperatures are in celsius by default when weather info is received from the API, so
  // there is no need for conversions if the specified temperature scale is celsius.
  // convertToFahrenheit will return a rounded temperature, therefore a supplementary function
  // for rounding the temperature should be provided if no conversion is happening.
  const tempModification =
    getCurrentTempScale() === "Fahrenheit" ? convertToFahrenheit : Math.round;
  days.forEach((dailyWeatherInfo) =>
    modifyTemps(dailyWeatherInfo, tempModification),
  );
  return days;
};

const processUserAddress = (userAddress) => {
  userAddress = userAddress.addresses[0].address;
  const city = userAddress.localName;
  const state = userAddress.countrySubdivisionName;
  addLocation(city, state, true);
  return { city, state };
};

export { processWeatherInfo, processUserAddress };
