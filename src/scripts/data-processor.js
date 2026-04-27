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

export { processWeatherInfo, processUserAddress };
