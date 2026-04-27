import { addLocation } from "./location-manager";
import { convertToFahrenheit, convertTemps } from "./temp-converter";

const processWeatherInfo = (weatherInfo, tempScale) => {
  const days = weatherInfo.days;
  if (tempScale === "Fahrenheit") {
    days.forEach((dailyWeatherInfo) =>
      convertTemps(dailyWeatherInfo, convertToFahrenheit),
    );
  }
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
