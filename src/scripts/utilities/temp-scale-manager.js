import { storageAvailable } from "./storage-handler";

let currentTempScale = "Fahrenheit";

const getCurrentTempScale = () => currentTempScale;

const switchCurrentTempScale = () => {
  currentTempScale = currentTempScale === "Fahrenheit" ? "Celsius" : "Fahrenheit";
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
