import { showLocationsSidebar } from "./locations-sidebar-controller";

import { updateLocationsSidebar } from "../view/locations-sidebar";
import { updateMainContent } from "../view/main-content";
import { removeErrorMessage } from "../view/utilities/error-message-handler";

import { switchCurrentTempScale } from "../model/temp-scale-manager";
import { convertTemps } from "../model/utilities/temp-converter";

let openLocationWeatherInfo;
let openLocation;

const mainContent = document.querySelector("#main-content");

const initializeMainContent = (days, location) => {
  mainContent.className = mainContent.className.replace("hidden", "");
  openLocationWeatherInfo = days;
  openLocation = location;
  updateMainContent(days, location);
};

mainContent.addEventListener("click", (event) => {
  const selectedButton = event.target;

  if (selectedButton.className === "open-sidebar-btn") {
    removeErrorMessage();
    updateLocationsSidebar();
    showLocationsSidebar();
  } else if (selectedButton.className === "temp-converter-btn") {
    selectedButton.textContent =
      selectedButton.textContent === "Celsius" ? "Fahrenheit" : "Celsius";

    switchCurrentTempScale();
    convertTemps(openLocationWeatherInfo);
    updateMainContent(openLocationWeatherInfo, openLocation);
  }
});

let interval;

mainContent.addEventListener("mousedown", (event) => {
  const selectedButton = event.target;
  const hourlyWeatherInfo = document.querySelector(".weather-info.hourly");

  if (selectedButton.className.includes("right")) {
    interval = setInterval(() => (hourlyWeatherInfo.scrollLeft += 5), 5);
  } else if (selectedButton.className.includes("left")) {
    interval = setInterval(() => (hourlyWeatherInfo.scrollLeft -= 5), 5);
  }
});

mainContent.addEventListener("mouseup", () => {
  clearInterval(interval);
});

export { initializeMainContent };
