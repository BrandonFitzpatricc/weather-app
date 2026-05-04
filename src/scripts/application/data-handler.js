import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "./data-retriever";
import { processWeatherInfo, processUserAddress } from "./data-processor";
import { getOpenLocation } from "./location-manager";
import {
  updateMainContent,
  toggleMainContent,
} from "../ui/main-content-controller";
import { toggleLoader } from "../ui/load-display-handler";

const handleOpenLocationWeatherInfo = async () => {
  toggleLoader("#loader", "visible");
  const openLocation = getOpenLocation();
  const weatherInfo = processWeatherInfo(await fetchWeatherInfo(openLocation));
  toggleLoader("#loader", "not visible");
  updateMainContent(weatherInfo, openLocation);
  toggleMainContent("visible");
};

const handleUserLocationWeatherInfo = async () => {
  const userPosition = await getUserPosition();
  toggleLoader("#loader", "visible");
  const userAddress = processUserAddress(await fetchUserAddress(userPosition));
  const weatherInfo = processWeatherInfo(await fetchWeatherInfo(userAddress));
  toggleLoader("#loader");
  updateMainContent(weatherInfo, getOpenLocation());
  toggleMainContent("visible", "not visible");
};

export { handleOpenLocationWeatherInfo, handleUserLocationWeatherInfo };
