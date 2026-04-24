import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { fetchWeatherInfo, fetchUserAddress, getUserCoordinates } from "./data-retriever";
import { processWeatherInfo, processUserCoordinates } from "./data-processor";

const userCoordinates = processUserCoordinates(await getUserCoordinates());

const userAddress = await fetchUserAddress(userCoordinates);
console.log(userAddress);

const coordinatesWeatherInfo = processWeatherInfo(
  await fetchWeatherInfo(userCoordinates),
);
console.log(coordinatesWeatherInfo)

const addressWeatherInfo = processWeatherInfo(await fetchWeatherInfo(["Shirley"], ["New York"]));
console.log(addressWeatherInfo);
