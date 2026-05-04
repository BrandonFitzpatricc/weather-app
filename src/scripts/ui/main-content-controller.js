import { weatherIcons } from "./icon-manager";
import {
  createDailyWeatherInfoEntry,
  createHourlyWeatherInfoEntry,
} from "./element-factory";
import {
  toggleLocationsSidebar,
  updateLocationsSidebar,
} from "./location-sidebar-controller";
import {
  getCurrentTempScale,
  switchCurrentTempScale,
} from "../utilities/temp-scale-manager";
import { convertTemps } from "../utilities/temp-converter";

let openLocationWeatherInfo;
let openLocation;

const mainContent = document.querySelector("#main-content");
const hourlyWeatherInfo = document.querySelector("#hourly-weather-info");

const updateMainContent = (days, location) => {
  openLocationWeatherInfo = days;
  openLocation = location;
  updateHeader(days[0], location);
  updateHourlyWeatherInfo(days[0].hours);
  updateDailyWeatherInfo(days);
};

// toggleStatus is an optional parameter to strictly toggle main content to be visible
// or not. Otherwise, it will simply switch its current toggle status.
const toggleMainContent = (toggleStatus) => {
  mainContent.className =
    mainContent.className.includes("hidden") || toggleStatus === "visible"
      ? "main-content"
      : "main-content hidden";
};

mainContent.addEventListener("click", (event) => {
  const selectedButton = event.target;

  const buttonHandler = {
    "open-sidebar-btn": () => {
      updateLocationsSidebar();
      toggleLocationsSidebar();
    },
    "temp-converter-btn": () => {
      selectedButton.textContent =
        selectedButton.textContent === "Celsius" ? "Fahrenheit" : "Celsius";
      switchCurrentTempScale();
      convertTemps(openLocationWeatherInfo);
      updateMainContent(openLocationWeatherInfo, openLocation);
    },
    "scroll-left-btn": () => {
      hourlyWeatherInfo.scrollLeft -= 100;
      checkScrollConstraints();
    },
    "scroll-right-btn": () => {
      hourlyWeatherInfo.scrollLeft += 100;
      console.log(hourlyWeatherInfo.scrollLeft);
      checkScrollConstraints();
    },
  };

  buttonHandler[selectedButton.id]();
});

function updateHeader(dailyWeatherInfo, location) {
  const header = document.querySelector("#header");
  header.querySelector("#current-temp").textContent =
    `${dailyWeatherInfo.temp}°`;
  header.querySelector("#temp-converter-btn").textContent =
    getCurrentTempScale();
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

  hourlyWeatherInfo.querySelectorAll(".entry").forEach((entry) => {
    hourlyWeatherInfo.removeChild(entry);
  });

  hours.forEach((weatherInfo) =>
    hourlyWeatherInfo.appendChild(createHourlyWeatherInfoEntry(weatherInfo)),
  );
}

function updateDailyWeatherInfo(days) {
  const dailyWeatherInfo = document.querySelector("#daily-weather-info");
  dailyWeatherInfo.textContent = "";
  days.forEach((weatherInfo) =>
    dailyWeatherInfo.appendChild(createDailyWeatherInfoEntry(weatherInfo)),
  );
}

function checkScrollConstraints() {
  checkLeftScrollConstraints();
  checkRightScrollConstraints();
}

function checkLeftScrollConstraints() {
  const scrollLeftBtn = document.querySelector("#scroll-left-btn");
  if (hourlyWeatherInfo.scrollLeft === 0) {
    scrollLeftBtn.className = "scroll-btn left hidden";
  } else {
    scrollLeftBtn.className = "scroll-btn left";
  }
}

function checkRightScrollConstraints() {
  const scrollRightBtn = document.querySelector("#scroll-right-btn");
  if (hourlyWeatherInfo.scrollLeft === 800) {
    scrollRightBtn.className = "scroll-btn right hidden";
  } else {
    scrollRightBtn.className = "scroll-btn right";
  }
}

export { updateMainContent, toggleMainContent };
