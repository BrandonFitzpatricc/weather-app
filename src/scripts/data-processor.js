const processWeatherInfo = (weatherInfo) => {
  return weatherInfo.days;
};

const processUserAddress = (userAddress) => {
  return [
    userAddress.addresses[0].address.localName,
    userAddress.addresses[0].address.countrySubdivisionCode,
  ];
};

const processUserCoordinates = (userCoordinates) => {
  return [userCoordinates.coords.latitude, userCoordinates.coords.longitude];
};

export { processWeatherInfo, processUserAddress, processUserCoordinates };
