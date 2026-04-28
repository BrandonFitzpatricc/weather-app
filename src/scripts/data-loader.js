import {
  fetchWeatherInfo,
  fetchUserAddress,
  getUserPosition,
} from "./data-retriever";

import { processWeatherInfo, processUserAddress } from "./data-processor";

import { getOpenLocation } from "./location-manager";

const startup = () => {
  fetchWeatherInfo(getOpenLocation())
    .then((weatherInfo) => {
      console.log(processWeatherInfo(weatherInfo, "Celsius"));
    })
    .catch(() =>
      console.log("Weather information cannot be retrieved at this time."),
    );

  getUserPosition()
    .then(async (position) => {
      const location = processUserAddress(await fetchUserAddress(position));
      console.log(processWeatherInfo(await fetchWeatherInfo(location)));
    })
    .catch(() => {
      console.log(
        "Weather information could not be retrieved for this location.",
      );
    });
};

export { startup };
