const processWeatherInfo = (weatherInfo) => {
  return weatherInfo.days;
};

const processUserAddress = (userAddress) => {
  userAddress = userAddress.addresses[0].address
  return {
    city: userAddress.localName,
    state: userAddress.countrySubdivisionCode,
  };
};

const processUserCoordinates = (userCoordinates) => {
  return [userCoordinates.coords.latitude, userCoordinates.coords.longitude];
};

export { processWeatherInfo, processUserAddress, processUserCoordinates };
