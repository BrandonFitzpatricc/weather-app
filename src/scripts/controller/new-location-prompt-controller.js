import { initializeMainContent } from "./main-content-controller";

import { fetchWeatherInfo } from "../model/data-retriever";
import { processWeatherInfo } from "../model/data-processor";
import { getOpenLocation } from "../model/location-manager";
import { handleFormSubmissionError } from "../model/utilities/error-handler";

import { showLoader, hideLoader } from "../view/utilities/load-display-handler";

const prompt = document.querySelector("#new-location-prompt");

const openNewLocationPrompt = () => {
  prompt.className = "new-location-prompt";
};

prompt.addEventListener("submit", (event) =>
  handleFormSubmissionError(submitLocation, event, () => {
    hideLoader("#prompt-submission-loader");
    showErrorMessage();
  }),
);

prompt.addEventListener("input", checkValidity);

prompt.addEventListener("click", (event) => {
  if (event.target.className === "back-btn") {
    prompt.querySelector(".new-location-form").reset();
    closeNewLocationPrompt();
  }
});

async function submitLocation(event) {
  event.preventDefault();

  showLoader("#prompt-submission-loader");

  const formInputs = prompt.querySelectorAll("input");
  const location = { city: formInputs[0].value, state: formInputs[1].value };
  const weatherInfo = processWeatherInfo(await fetchWeatherInfo(location));

  hideLoader("#prompt-submission-loader");

  initializeMainContent(weatherInfo, getOpenLocation());

  closeNewLocationPrompt();

  prompt.querySelector(".new-location-form").reset();
}

function closeNewLocationPrompt() {
  prompt.className = "new-location-prompt hidden";
}

function checkValidity(event) {
  const input = event.target;
  if (input.validity.patternMismatch) {
    input.setCustomValidity(
      `The ${input.id} field can only contain letters with spaces in between.`,
    );
  } else if (input.validity.valueMissing || !input.value.trim()) {
    input.setCustomValidity(`The ${input.id} field must contain a value.`);
  } else {
    input.setCustomValidity("");
  }
}

function showErrorMessage() {
  document.querySelector(".error-message").className = "error-message";
}

export { openNewLocationPrompt };
