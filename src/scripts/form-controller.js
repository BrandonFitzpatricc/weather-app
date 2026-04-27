import { fetchWeatherInfo } from "./data-retriever";
import { processWeatherInfo } from "./data-processor";
import { addLocation } from "./location-manager";

const form = document.querySelector("#new-location-form");
const formInputs = form.querySelectorAll("input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const location = { city: formInputs[0].value, state: formInputs[1].value };
  addLocation(location.city, location.state, true);
  const addressWeatherInfo = processWeatherInfo(
    await fetchWeatherInfo(location),
  );
  console.log(addressWeatherInfo);
  form.reset();
});

formInputs.forEach((input) => {
  input.addEventListener("input", checkErrors);
});

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

// Temporary export to ensure the form controller is detected as a dependency.
export { checkErrors }
