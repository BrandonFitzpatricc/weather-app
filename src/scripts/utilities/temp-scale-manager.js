import { storageAvailable } from "./storage-handler";

let currentTempScale = "Celsius";

const getCurrentTempScale = () => currentTempScale;

const switchCurrentTempScale = () => {
  currentTempScale = currentTempScale === "Celsius" ? "Fahrenheit" : "Celsius";
};

const saveCurrentTempScale = () => {
  if (storageAvailable("localStorage")) {
    localStorage.setItem("currentTempScale", JSON.stringify(currentTempScale));
  }
};

const loadCurrentTempScale = () => {
  const savedTempScale = localStorage.getItem("currentTempScale");
  if (savedTempScale) {
    currentTempScale = JSON.parse(savedTempScale);
  }
};

export {
  getCurrentTempScale,
  switchCurrentTempScale,
  saveCurrentTempScale,
  loadCurrentTempScale,
};
