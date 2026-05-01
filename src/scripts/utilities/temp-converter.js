const convertToCelsius = (temp) => {
  return Math.round(((temp - 32) * 5) / 9);
};

const convertToFahrenheit = (temp) => {
  return Math.round((temp * 9) / 5 + 32);
};

export { convertToCelsius, convertToFahrenheit };
