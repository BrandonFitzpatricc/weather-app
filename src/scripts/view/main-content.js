import {
  openSidebarIcon,
  weatherIcons,
  scrollLeftIcon,
  scrollRightIcon,
} from "./utilities/icon-manager";

import {
  createElement,
  createTextElement,
  createIconBtn,
  createIcon,
} from "./utilities/element-factory";

import { getCurrentTempScale } from "../model/temp-scale-manager";

const updateMainContent = (days, location) => {
  const mainContent = document.querySelector("#main-content");
  mainContent.textContent = "";

  const openSidebarBtn = createIconBtn(
    "open-sidebar-btn",
    openSidebarIcon,
    "menu selection icon",
    65,
  );

  const header = updateHeader(days[0], location);

  const hourlyWeatherInfo = updateHourlyWeatherInfo(days[0].hours);

  const dailyWeatherInfo = updateDailyWeatherInfo(days);

  mainContent.append(
    openSidebarBtn,
    header,
    hourlyWeatherInfo,
    dailyWeatherInfo,
  );
};

function updateHeader(todaysWeatherInfo, location) {
  const header = createElement("div", "header");

  const currentTemp = createTextElement(
    "div",
    "temp current",
    `${todaysWeatherInfo.temp}°`,
  );

  const tempConverterBtn = createTextElement(
    "button",
    "temp-converter-btn",
    getCurrentTempScale(),
  );

  const locationName = createTextElement(
    "div",
    "location-name",
    `${location.city}, ${location.state}`,
  );

  const tempInfo = createElement("div", "temp-info");

  const feelLikeTemp = createTextElement(
    "div",
    "temp feel-like",
    `Feels like ${todaysWeatherInfo.feelslike}°`,
  );

  const highTemp = createTextElement(
    "div",
    "temp high",
    `High ${todaysWeatherInfo.tempmax}°`,
  );

  const lowTemp = createTextElement(
    "div",
    "temp low",
    `Low ${todaysWeatherInfo.tempmin}°`,
  );

  tempInfo.append(feelLikeTemp, highTemp, lowTemp);

  const weatherIcon = createIcon(
    "icon weather",
    weatherIcons[todaysWeatherInfo.icon],
    todaysWeatherInfo.icon,
  );

  header.append(
    currentTemp,
    tempConverterBtn,
    locationName,
    tempInfo,
    weatherIcon,
  );

  return header;
}

function updateHourlyWeatherInfo(hours) {
  const hourlyWeatherInfo = createElement("div", "weather-info hourly");

  const scrollLeftBtn = createIconBtn(
    "scroll-btn left",
    scrollLeftIcon,
    "scroll left icon",
    "50",
  );

  const scrollRightBtn = createIconBtn(
    "scroll-btn right",
    scrollRightIcon,
    "scroll-right-icon",
    "50",
  );

  hourlyWeatherInfo.append(scrollLeftBtn, scrollRightBtn);

  hours.forEach((weatherInfo) =>
    hourlyWeatherInfo.appendChild(createHourlyWeatherInfoEntry(weatherInfo)),
  );

  return hourlyWeatherInfo;
}

function updateDailyWeatherInfo(days) {
  const dailyWeatherInfo = createElement("div", "weather-info daily");

  days.forEach((weatherInfo) =>
    dailyWeatherInfo.appendChild(createDailyWeatherInfoEntry(weatherInfo)),
  );

  return dailyWeatherInfo;
}

function createHourlyWeatherInfoEntry(hourlyWeatherInfo) {
  const entry = createElement("div", "entry");

  const time = createTextElement(
    "div",
    "time",
    // The date passed to this object is irrelevant, as its only purpose is to assist
    // in formatting the provided time to AM/PM format.
    new Date(`2026-01-01T${hourlyWeatherInfo.datetime}`).toLocaleString(
      "en-US",
      { hour: "numeric", hour12: true },
    ),
  );

  const weatherIcon = createIcon(
    "icon weather",
    weatherIcons[hourlyWeatherInfo.icon],
    hourlyWeatherInfo.icon,
    50,
  );

  const temp = createTextElement("div", "temp", `${hourlyWeatherInfo.temp}°`);

  const rainPercentage = createElement("div", "rain-percentage");
  rainPercentage.append(
    createIcon(
      "icon",
      weatherIcons["rain-percentage"],
      "rain percentage icon",
      30,
    ),
    createTextElement("div", "text", `${hourlyWeatherInfo.precipprob}%`),
  );

  entry.append(time, weatherIcon, temp, rainPercentage);
  return entry;
}

function createDailyWeatherInfoEntry(dailyWeatherInfo) {
  const entry = createElement("div", "entry");

  // Time is hard coded to prevent a bug where the weekday is incorrectly
  // set to the day before the specified date.
  const date = new Date(`${dailyWeatherInfo.datetime}T00:00:00`);

  const weekDay = createTextElement(
    "div",
    "week-day",
    date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
      ? "Today"
      : date.toLocaleDateString("en-us", {
          weekday: "long",
        }),
  );

  const subInfo = [
    createSubInfo(
      createIcon(
        "icon",
        weatherIcons["rain-percentage"],
        "rain percentage icon",
        50,
      ),
      createTextElement(
        "div",
        "rain-percentage",
        `${dailyWeatherInfo.precipprob}%`,
      ),
    ),

    createSubInfo(
      createIcon("icon weather", weatherIcons[dailyWeatherInfo.hours[8].icon]),
      createIcon("icon weather", weatherIcons[dailyWeatherInfo.hours[20].icon]),
    ),

    createSubInfo(
      createTextElement("div", "temp high", `${dailyWeatherInfo.tempmax}°`),
      createTextElement("div", "temp low", `${dailyWeatherInfo.tempmin}°`),
    ),
  ];

  entry.appendChild(weekDay);

  subInfo.forEach((subInfo) => entry.appendChild(subInfo));

  return entry;
}

function createSubInfo(...elements) {
  const subInfo = createElement("div", "sub-info");
  elements.forEach((element) => subInfo.appendChild(element));
  return subInfo;
}

export { updateMainContent };
