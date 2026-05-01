import { weatherIcons } from "./icon-handler";
import {
  createDailyWeatherInfoEntry,
  createHourlyWeatherInfoEntry,
} from "./element-factory";

const updateMainContent = (days, location) => {
  updateHeader(days[0], location);
  updateHourlyWeatherInfo(days[0].hours);
  updateDailyWeatherInfo(days);
};

function updateHeader(dailyWeatherInfo, location) {
  const header = document.querySelector("#header");
  header.querySelector("#current-temp").textContent =
    `${dailyWeatherInfo.temp}°`;
  header.querySelector("#location-name").textContent =
    `${location.city}, ${location.state}`;
  header.querySelector("#feel-like-temp").textContent =
    `Feels like ${dailyWeatherInfo.feelslike}°`;
  header.querySelector("#high-temp").textContent =
    `High ${dailyWeatherInfo.tempmax}°`;
  header.querySelector("#low-temp").textContent =
    `Low ${dailyWeatherInfo.tempmin}°`;
  const weatherIcon = header.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", weatherIcons[dailyWeatherInfo.icon]);
  weatherIcon.setAttribute("alt", weatherIcons[dailyWeatherInfo.icon]);
}

function updateHourlyWeatherInfo(hours) {
  const hourlyWeatherInfo = document.querySelector("#hourly-weather-info");
  hours.forEach((weatherInfo) =>
    hourlyWeatherInfo.append(createHourlyWeatherInfoEntry(weatherInfo)),
  );
}

function updateDailyWeatherInfo(days) {
  const dailyWeatherInfo = document.querySelector("#daily-weather-info");
  days.forEach((weatherInfo) =>
    dailyWeatherInfo.append(createDailyWeatherInfoEntry(weatherInfo)),
  );
}

export { updateMainContent };
