import {
  locationIcon,
  locationsIcon,
  deleteIcon,
  closeSidebarIcon,
  addIcon,
} from "./utilities/icon-manager";

import {
  createElement,
  createTextElement,
  createIcon,
  createIconBtn,
} from "./utilities/element-factory";

import { Attribute } from "./utilities/attribute";

import { getLocations } from "../model/location-manager";

const updateLocationsSidebar = () => {
  const locationsSidebar = document.querySelector("#locations-sidebar");
  locationsSidebar.textContent = "";

  const heading = createElement("div", "heading");

  const headingIcon = createIcon("icon", locationsIcon, "locations icon", "65");

  const headingText = createTextElement("div", "heading-text", "Locations");

  const closeSidebarBtn = createIconBtn(
    "close-sidebar-btn",
    closeSidebarIcon,
    "collapse sidebar icon",
    "65",
  );

  heading.append(headingIcon, headingText, closeSidebarBtn);

  locationsSidebar.appendChild(heading);

  getLocations().forEach((location) =>
    locationsSidebar.appendChild(createLocationTab(location)),
  );

  const newLocationTab = createElement("div", "tab new-location");

  const addLocationBtn = createIconBtn(
    "add-location-btn",
    addIcon,
    "add icon",
    55,
  );

  addLocationBtn.appendChild(
    createTextElement("div", "btn-text", "New Location"),
  );

  newLocationTab.appendChild(addLocationBtn);

  locationsSidebar.appendChild(newLocationTab);
};

const createLocationTab = (location) => {
  const locationTab = createElement(
    "div",
    `tab location${location.isOpen ? " selected" : ""}`,
    new Attribute("data-id", location.id),
  );

  const locationBtn = createElement("button", "location-btn");

  locationBtn.append(
    createIcon("icon", locationIcon, "location icon", 55),
    createTextElement("div", "location-name", location.city),
  );

  const deleteLocationBtn = createElement("button", "delete-location-btn");
  deleteLocationBtn.appendChild(
    createIcon("icon", deleteIcon, "trash can icon", 55),
  );

  locationTab.append(locationBtn, deleteLocationBtn);
  return locationTab;
};

export { updateLocationsSidebar };
