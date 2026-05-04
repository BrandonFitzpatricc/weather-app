import { getCurrentTempScale } from "./temp-scale-manager";
import { modifyTemps } from "./temp-modifier";

const convertTemps = (weatherInfo) => {
  const tempConversionFn =
    getCurrentTempScale() === "Celsius"
      ? convertToCelsius
      : convertToFahrenheit;
  weatherInfo.forEach((dailyWeatherInfo) => {
    modifyTemps(dailyWeatherInfo, tempConversionFn);
  });
};

const convertToCelsius = (temp) => {
  return Math.round(((temp - 32) * 5) / 9);
};

const convertToFahrenheit = (temp) => {
  return Math.round((temp * 9) / 5 + 32);
};

export { convertTemps, convertToCelsius, convertToFahrenheit };
