import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserCoordinates,
} from "./data-retriever";

import {
  processWeatherInfo,
  processUserAddress,
  processUserCoordinates,
} from "./data-processor";

import { convertToCelsius, convertToFahrenheit } from "./temp-converter";

console.log(convertToCelsius(63));
console.log(convertToFahrenheit(17.2));

const userCoordinates = processUserCoordinates(await getUserCoordinates());

const userAddress = processUserAddress(await fetchUserAddress(userCoordinates));
console.log(userAddress);

const coordinatesWeatherInfo = processWeatherInfo(
  await fetchWeatherInfo(userCoordinates),
);
console.log(coordinatesWeatherInfo);

const addressWeatherInfo = processWeatherInfo(
  await fetchWeatherInfo(["Shirley"], ["New York"]),
);
console.log(addressWeatherInfo);
