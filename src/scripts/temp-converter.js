const convertToCelsius = (temp) => {
  return ((temp - 32) * 5) / 9;
};

const convertToFahrenheit = (temp) => {
  return (temp * 9) / 5 + 32;
};

export { convertToCelsius, convertToFahrenheit };
