import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "./data-retriever";
import { processWeatherInfo, processUserAddress } from "./data-processor";
import { getOpenLocation } from "./location-manager";
import { closeOpenLocation } from "./location-manager";

const handleOpenLocationWeatherInfo = async () => {
  const weatherInfo = await fetchWeatherInfo(getOpenLocation());
  console.log(processWeatherInfo(weatherInfo, "Celsius"));
}

const handleUserLocationWeatherInfo = async () => {
  const userPosition = await getUserPosition();
  const userAddress = processUserAddress(await fetchUserAddress(userPosition));
  console.log(processWeatherInfo(await fetchWeatherInfo(userAddress)));
  closeOpenLocation();
}

export { handleOpenLocationWeatherInfo, handleUserLocationWeatherInfo };
