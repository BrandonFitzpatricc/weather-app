import { fetchWeatherInfo } from "../application/data-retriever";
import { processWeatherInfo } from "../application/data-processor";
import { addLocation } from "../application/location-manager";
import { handleFormSubmissionError } from "../utilities/error-handler";
import { updateMainContent } from "./main-content-controller";
import { toggleLoader } from "./load-display-handler";

const prompt = document.querySelector("#new-location-prompt");
const form = document.querySelector("#new-location-form");
const formInputs = form.querySelectorAll("input");

const toggleForm = () => {
  prompt.className = prompt.className.includes("hidden")
    ? "new-location-prompt"
    : "new-location-prompt hidden";
};

form.addEventListener("submit", (event) =>
  handleFormSubmissionError(submitLocation, event, () => {
    toggleLoader("#new-location-form .loader", "not visible")
    toggleErrorMessage("visible")
  }),
);

formInputs.forEach((input) => {
  input.addEventListener("input", checkValidity);
});

form.querySelector("#back-btn").addEventListener("click", () => {
  toggleErrorMessage("not visible");
  form.reset();
  toggleForm();
});

async function submitLocation(event) {
  event.preventDefault();
  toggleLoader("#new-location-form .loader", "visible");
  const location = { city: formInputs[0].value, state: formInputs[1].value };
  const weatherInfo = processWeatherInfo(await fetchWeatherInfo(location));
  toggleLoader("#new-location-form .loader", "not visible");
  addLocation(location.city, location.state, true);
  updateMainContent(weatherInfo, location);
  prompt.className = "new-location-prompt hidden";
  toggleErrorMessage("not visible");
  form.reset();
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

// toggleStatus is a parameter to strictly toggle the error message to be visible or not.
function toggleErrorMessage(toggleStatus) {
  document.querySelector("#error-message").className =
    toggleStatus === "visible" ? "error-message" : "error-message hidden";
}

export { toggleForm };
