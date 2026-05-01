import { weatherIcons, locationIcon, deleteIcon } from "./icon-handler";

const createHourlyWeatherInfoEntry = (hourlyWeatherInfo) => {
  const entry = createElement("div", "", new Attribute("class", "entry"));
  const time = createElement(
    "div",
    // The date passed to this object is irrelevant, as its only purpose is to assist
    // in formatting the provided time to AM/PM format.
    new Date(`2026-01-01T${hourlyWeatherInfo.datetime}`).toLocaleString(
      "en-US",
      { hour: "numeric", hour12: true },
    ),
    new Attribute("class", "time"),
  );
  const weatherIcon = createIcon(
    "icon weather",
    weatherIcons[hourlyWeatherInfo.icon],
    hourlyWeatherInfo.icon,
    50,
  );
  const temp = createElement(
    "div",
    `${hourlyWeatherInfo.temp}°`,
    new Attribute("class", "temp"),
  );
  entry.append(time, weatherIcon, temp);
  return entry;
};

const createDailyWeatherInfoEntry = (dailyWeatherInfo) => {
  const entry = createElement("div", "", new Attribute("class", "entry"));
  // Time is hard coded to prevent a bug where the weekday is incorrectly
  // set to the day before the specified date.
  const date = new Date(`${dailyWeatherInfo.datetime}T00:00:00`);
  const weekDay = createElement(
    "div",
    date.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)
      ? "Today"
      : date.toLocaleDateString("en-us", {
          weekday: "long",
        }),
    new Attribute("class", "week-day"),
  );
  const subInfo = [
    createSubInfo(
      createIcon(
        "icon weather",
        weatherIcons["rain-percentage"],
        dailyWeatherInfo.icon,
        50,
      ),
      createElement(
        "div",
        `${dailyWeatherInfo.precipprob}%`,
        new Attribute("class", "rain-percentage"),
      ),
    ),

    createSubInfo(
      createIcon("icon weather", weatherIcons[dailyWeatherInfo.hours[8].icon]),
      createIcon("icon weather", weatherIcons[dailyWeatherInfo.hours[20].icon]),
    ),

    createSubInfo(
      createElement(
        "div",
        `${dailyWeatherInfo.tempmax}°`,
        new Attribute("class", "temp high"),
      ),
      createElement(
        "div",
        `${dailyWeatherInfo.tempmin}°`,
        new Attribute("class", "temp low"),
      ),
    ),
  ];
  entry.appendChild(weekDay);
  subInfo.forEach((subInfo) => entry.appendChild(subInfo));
  return entry;
};

const createLocationTab = (location) => {
  const locationTab = createElement(
    "div",
    "",
    new Attribute("class", `tab location ${location.isOpen ? "selected" : ""}`),
  );

  const locationBtn = createElement(
    "button",
    "",
    new Attribute("class", "location-btn"),
  );
  locationBtn.append(
    createIcon("icon", locationIcon, "location icon", 55),
    createElement(
      "div",
      location.city,
      new Attribute("class", "location-name"),
    ),
  );

  const deleteLocationBtn = createElement(
    "button",
    "",
    new Attribute("class", "delete-location-btn"),
  );
  deleteLocationBtn.appendChild(
    createIcon("icon", deleteIcon, "trash can icon", 55),
  );

  locationTab.append(locationBtn, deleteLocationBtn);
  return locationTab;
};

const createErrorMessage = () =>
  createElement(
    "div",
    "Weather information cannot be retrieved at this time.",
    new Attribute("class", "error-message"),
  );

function createIcon(className, src, alt, dimensions) {
  return createElement(
    "img",
    "",
    new Attribute("class", className),
    new Attribute("src", src),
    new Attribute("alt", alt),
    new Attribute("width", dimensions),
    new Attribute("height", dimensions),
  );
}

function createSubInfo(...elements) {
  const subInfo = createElement("div", "", new Attribute("class", "sub-info"));
  elements.forEach((element) => subInfo.appendChild(element));
  return subInfo;
}

function createElement(elementType, textContent, ...attributes) {
  const newElement = document.createElement(elementType);
  newElement.textContent = textContent;
  attributes.forEach((attribute) =>
    newElement.setAttribute(attribute.name, attribute.value),
  );
  return newElement;
}

class Attribute {
  #name;
  #value;

  constructor(name, value) {
    this.#name = name;
    this.#value = value;
  }

  get name() {
    return this.#name;
  }

  get value() {
    return this.#value;
  }
}

export {
  createHourlyWeatherInfoEntry,
  createDailyWeatherInfoEntry,
  createLocationTab,
  createErrorMessage,
};
