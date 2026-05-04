import clearDayIcon from "../../icons/weather-icons/clear-day.svg";
import clearNightIcon from "../../icons/weather-icons/clear-night.svg";
import cloudyIcon from "../../icons/weather-icons/cloudy.svg";
import fogIcon from "../../icons/weather-icons/fog.svg";
import partlyCloudyDayIcon from "../../icons/weather-icons/partly-cloudy-day.svg";
import partlyCloudyNightIcon from "../../icons/weather-icons/partly-cloudy-night.svg";
import rainPercentageIcon from "../../icons/weather-icons/rain-percentage.svg";
import rainIcon from "../../icons/weather-icons/rain.svg";
import snowIcon from "../../icons/weather-icons/snow.svg";
import windIcon from "../../icons/weather-icons/wind.svg";
import locationIcon from "../../icons/input-icons/location.svg";
import deleteIcon from "../../icons/input-icons/delete.svg";

// The processed weather info contains an icon property whose value matches the property name
// of one of the properties within this object, allowing the corresponding icon to be accessed.
const weatherIcons = {
  "clear-day": clearDayIcon,
  "clear-night": clearNightIcon,
  cloudy: cloudyIcon,
  fog: fogIcon,
  "partly-cloudy-day": partlyCloudyDayIcon,
  "partly-cloudy-night": partlyCloudyNightIcon,
  "rain-percentage": rainPercentageIcon,
  rain: rainIcon,
  snow: snowIcon,
  wind: windIcon,
};

export { weatherIcons, locationIcon, deleteIcon };
