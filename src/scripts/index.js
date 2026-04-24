import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { fetchWeatherInfo, getUserCoordinates } from "./data-retriever";
import { processWeatherInfo, processUserCoordinates } from "./data-processor";

const userCoordinates = processUserCoordinates(await getUserCoordinates());
const coordinatesWeatherInfo = processWeatherInfo(
  await fetchWeatherInfo(userCoordinates),
);
console.log(coordinatesWeatherInfo)

const addressWeatherInfo = processWeatherInfo(await fetchWeatherInfo(["Shirley"], ["New York"]));
console.log(addressWeatherInfo);
