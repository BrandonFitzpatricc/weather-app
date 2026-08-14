import {
  createElement,
  createIconBtn,
  createTextElement,
} from "./utilities/element-factory";

import { Attribute } from "./utilities/attribute";
import { backIcon } from "./utilities/icon-manager";

const displayNewLocationPrompt = () => {
  const newLocationPrompt = document.querySelector("#new-location-prompt");
  newLocationPrompt.textContent = "";

  const newLocationForm = createElement("form", "new-location-form");

  const formTitle = createTextElement("div", "form-title", "New Location");

  const cityField = createFormField("City");

  const stateField = createFormField("State");

  const enterBtn = createTextElement(
    "button",
    "enter-btn",
    "Enter",
    new Attribute("type", "submit"),
  );

  const errorMessage = createTextElement(
    "div",
    "error-message hidden",
    "Location Not Found",
  );

  const backBtn = createIconBtn("back-btn", backIcon, "back icon", "60");

  const promptSubmissionLoader = createElement(
    "div",
    "loader hidden",
    new Attribute("id", "prompt-submission-loader"),
  );

  newLocationForm.append(
    formTitle,
    cityField,
    stateField,
    enterBtn,
    errorMessage,
    backBtn,
    promptSubmissionLoader,
  );

  newLocationPrompt.appendChild(newLocationForm);
};

function createFormField(labelName) {
  const field = createElement("div", "form-field");

  field.append(
    createTextElement(
      "label",
      "",
      labelName,
      new Attribute("for", labelName.toLowerCase()),
    ),

    createElement(
      "input",
      "",
      new Attribute("type", "text"),
      new Attribute("id", labelName.toLowerCase()),
      new Attribute("required"),
      new Attribute("pattern", "^[a-zA-Z\\s]*$"),
    ),
  );

  return field;
}

export { displayNewLocationPrompt };
