const processWeatherInfo = (weatherInfo) => {
  return weatherInfo.days;
};

const processUserCoordinates = (userCoordinates) => {
  return [userCoordinates.coords.latitude, userCoordinates.coords.longitude];
};

export { processWeatherInfo, processUserCoordinates };
