import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "./data-retriever";

import { processWeatherInfo, processUserAddress } from "./data-processor";

// Temporary import to ensure the form controller is detected as a dependency.
import { checkErrors } from "./form-controller";

fetchWeatherInfo({ city: "Shirley", state: "NY" }).then((weatherInfo) => {
  console.log(processWeatherInfo(weatherInfo, "Celsius"));
});

getUserPosition().then(async (coordinates) => {
  const userAddress = processUserAddress(await fetchUserAddress(coordinates));
  console.log(userAddress);

  const weatherInfo = processWeatherInfo(await fetchWeatherInfo(userAddress), "Celsius");
  console.log(weatherInfo);
});
