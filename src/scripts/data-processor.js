import { addLocation } from "./location-manager";
import { convertToFahrenheit } from "./temp-converter";
import { modifyTemps } from "./temp-modifier";

const processWeatherInfo = (weatherInfo, tempScale) => {
  const days = weatherInfo.days;
  let tempModification;
  // Temperatures are in celsius by default when weather info is received from the API, so 
  // there is no need for conversions if the specified temperature scale is celsius. 
  // convertToFahrenheit will return a rounded temperature, therefore a supplementary function
  // for rounding the temperature should be provided if no conversion is happening.
  tempModification =
    tempScale === "Fahrenheit" ? convertToFahrenheit : Math.round;
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
