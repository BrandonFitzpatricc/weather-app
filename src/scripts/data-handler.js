import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "./data-retriever";
import { processWeatherInfo, processUserAddress } from "./data-processor";
import { getOpenLocation } from "./location-manager";
import { updateMainContent } from "./main-content-controller";

const handleOpenLocationWeatherInfo = async () => {
  const openLocation = getOpenLocation();
  const weatherInfo = processWeatherInfo(
    await fetchWeatherInfo(openLocation, "Celsius"),
  );
  updateMainContent(weatherInfo, openLocation);
};

const handleUserLocationWeatherInfo = async () => {
  const userPosition = await getUserPosition();
  const userAddress = processUserAddress(await fetchUserAddress(userPosition));
  const weatherInfo = processWeatherInfo(
    await fetchWeatherInfo(userAddress),
    "Celsius",
  );
  updateMainContent(weatherInfo, getOpenLocation());
};

export { handleOpenLocationWeatherInfo, handleUserLocationWeatherInfo };
