import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "./data-retriever";

import { processWeatherInfo, processUserAddress } from "./data-processor";

getUserPosition().then(async (coordinates) => {
  const userAddress = processUserAddress(await fetchUserAddress(coordinates));
  console.log(userAddress);

  const coordinatesWeatherInfo = processWeatherInfo(
    await fetchWeatherInfo(userAddress),
  );
  console.log(coordinatesWeatherInfo);
});

fetchWeatherInfo(["Shirley", "New York"]).then((weatherInfo) => {
  console.log(processWeatherInfo(weatherInfo));
});
