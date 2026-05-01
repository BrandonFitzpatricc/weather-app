import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "./data-retriever";
import { processWeatherInfo, processUserAddress } from "./data-processor";
import { getOpenLocation } from "./location-manager";
import { updateMainContent } from "./main-content-controller";

const handleOpenLocationWeatherInfo = async () => {
  let weatherInfo = await fetchWeatherInfo(getOpenLocation());
  weatherInfo = processWeatherInfo(weatherInfo, "Celsius");
  updateMainContent(weatherInfo, getOpenLocation());
}

const handleUserLocationWeatherInfo = async () => {
  const userPosition = await getUserPosition();
  const userAddress = processUserAddress(await fetchUserAddress(userPosition));
  const weatherInfo = processWeatherInfo(await fetchWeatherInfo(userAddress), "Fahrenheit");
  updateMainContent(weatherInfo, getOpenLocation());
}

export { handleOpenLocationWeatherInfo, handleUserLocationWeatherInfo };
