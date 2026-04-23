import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { fetchWeatherInfo, getUserLocation } from "./data-retriever";

getUserLocation().then((userLocation) =>
  fetchWeatherInfo(userLocation).then((weatherInfo) =>
    console.log(weatherInfo),
  ),
);

fetchWeatherInfo(["Shirley", "New York"]).then((result) => console.log(result));
