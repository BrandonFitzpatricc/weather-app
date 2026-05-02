import { fetchWeatherInfo } from "../application/data-retriever";
import { processWeatherInfo } from "../application/data-processor";
import { addLocation } from "../application/location-manager";
import { handleFormSubmissionError } from "../utilities/error-handler";
import { updateMainContent } from "./main-content-controller";

const prompt = document.querySelector("#new-location-prompt");
const form = document.querySelector("#new-location-form");
const formInputs = form.querySelectorAll("input");
const errorMessage = document.querySelector("#error-message");

const openForm = () => prompt.className = "new-location-prompt";

form.addEventListener("submit", (event) =>
  handleFormSubmissionError(
    submitLocation,
    event,
    () => (errorMessage.className = "error-message"),
  ),
);

formInputs.forEach((input) => {
  input.addEventListener("input", checkErrors);
});

async function submitLocation(event) {
  event.preventDefault();
  const location = { city: formInputs[0].value, state: formInputs[1].value };
  const weatherInfo = processWeatherInfo(await fetchWeatherInfo(location));
  addLocation(location.city, location.state, true);
  updateMainContent(weatherInfo, location);
  prompt.className = "new-location-prompt hidden";
  form.reset();
}

function checkErrors(event) {
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

export { openForm };
