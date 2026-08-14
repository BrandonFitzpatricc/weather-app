import { initializeMainContent } from "./main-content-controller";

import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "../model/data-retriever";

import {
  processWeatherInfo,
  processUserAddress,
} from "../model/data-processor";

import { getOpenLocation } from "../model/location-manager";

import { showLoader, hideLoader } from "../view/utilities/load-display-handler";

const serveOpenLocationWeatherInfo = async () => {
  showLoader("#main-content-loader");

  const openLocation = getOpenLocation();
  const weatherInfo = processWeatherInfo(await fetchWeatherInfo(openLocation));

  hideLoader("#main-content-loader");

  initializeMainContent(weatherInfo, openLocation);
};

const serveUserLocationWeatherInfo = async () => {
  const userPosition = await getUserPosition();

  showLoader("#main-content-loader");

  const userAddress = processUserAddress(await fetchUserAddress(userPosition));
  const weatherInfo = processWeatherInfo(await fetchWeatherInfo(userAddress));

  hideLoader("#main-content-loader");

  initializeMainContent(weatherInfo, getOpenLocation());
};

export { serveOpenLocationWeatherInfo, serveUserLocationWeatherInfo };
