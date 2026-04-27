const convertToCelsius = (temp) => {
  return Math.round(((temp - 32) * 5) / 9);
};

const convertToFahrenheit = (temp) => {
  return Math.round((temp * 9) / 5 + 32);
};

const convertTemps = (dailyWeatherInfo, conversionFn) => {
  for (const infoType in dailyWeatherInfo) {
    if (isTempInfo(dailyWeatherInfo[infoType])) {
      dailyWeatherInfo[infoType] = conversionFn(dailyWeatherInfo[infoType]);
    }
    const hours = dailyWeatherInfo.hours;
    hours.forEach((hourlyWeatherInfo) => {
      for (const infoType in hourlyWeatherInfo) {
        if (isTempInfo(dailyWeatherInfo[infoType])) {
          hourlyWeatherInfo[infoType] = conversionFn(
            hourlyWeatherInfo[infoType],
          );
        }
      }
    });
  }
};

// Any info type whose value is a number will always be temperature info
function isTempInfo(infoType) {
  return !isNaN(infoType);
}

export { convertToCelsius, convertToFahrenheit, convertTemps };
