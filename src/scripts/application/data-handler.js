import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "./data-retriever";
import { processWeatherInfo, processUserAddress } from "./data-processor";
import { getOpenLocation } from "./location-manager";
import { updateMainContent, toggleMainContent } from "../ui/main-content-controller";
import { toggleLoader } from "../ui/load-display-handler";

const handleOpenLocationWeatherInfo = async () => {
  toggleLoader("#loader");
  const openLocation = getOpenLocation();
  const weatherInfo = processWeatherInfo(
    await fetchWeatherInfo(openLocation, "Celsius"),
  );
  toggleLoader("#loader");
  updateMainContent(weatherInfo, openLocation);
  toggleMainContent("visible");
};

const handleUserLocationWeatherInfo = async () => {
  toggleLoader("#loader");
  const userPosition = await getUserPosition();
  const userAddress = processUserAddress(await fetchUserAddress(userPosition));
  const weatherInfo = processWeatherInfo(
    await fetchWeatherInfo(userAddress),
    "Celsius",
  );
  toggleLoader("#loader");
  updateMainContent(weatherInfo, getOpenLocation());
  toggleMainContent("visible");
};

export { handleOpenLocationWeatherInfo, handleUserLocationWeatherInfo };
