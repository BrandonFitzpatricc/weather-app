const processWeatherInfo = (weatherInfo) => {
    return weatherInfo.days;
}

const processUserLocation = (userLocation) => {
    return [userLocation.coords.latitude, userLocation.coords.longitude];
}

export { processWeatherInfo, processUserLocation }