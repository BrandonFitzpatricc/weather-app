// modifyFn will either be a function that converts temperatures to a different scale,
// or a function that rounds temperatures to whole numbers.
const modifyTemps = (dailyWeatherInfo, modifyFn) => {
  for (const infoType in dailyWeatherInfo) {
    if (isTempInfo(dailyWeatherInfo[infoType])) {
      dailyWeatherInfo[infoType] = modifyFn(dailyWeatherInfo[infoType]);
    }
    const hours = dailyWeatherInfo.hours;
    hours.forEach((hourlyWeatherInfo) => {
      for (const infoType in hourlyWeatherInfo) {
        if (isTempInfo(dailyWeatherInfo[infoType])) {
          hourlyWeatherInfo[infoType] = modifyFn(hourlyWeatherInfo[infoType]);
        }
      }
    });
  }
};

// Any info type whose value is a number will always be temperature info
function isTempInfo(infoType) {
  return !isNaN(infoType);
}

export { modifyTemps };
