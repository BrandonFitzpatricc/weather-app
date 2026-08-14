// modifyFn will either be a function that converts temperatures to a different scale,
// or a function that rounds temperatures to whole numbers.
const modifyTemps = (day, modifyFn) => {
  for (const infoType in day) {
    if (isTempInfo(day[infoType], infoType)) {
      day[infoType] = modifyFn(day[infoType]);
    }
  }
  
  const hours = day.hours;
  hours.forEach((hourlyWeatherInfo) => {
    for (const infoType in hourlyWeatherInfo) {
      if (isTempInfo(hourlyWeatherInfo[infoType], infoType)) {
        hourlyWeatherInfo[infoType] = modifyFn(hourlyWeatherInfo[infoType]);
      }
    }
  });
};

function isTempInfo(infoType, infoTypeName) {
  return !isNaN(infoType) && infoTypeName !== "precipprob";
}

export { modifyTemps };
