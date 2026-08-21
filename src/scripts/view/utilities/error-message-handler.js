import { createTextElement } from "./element-factory";

const displayErrorMessage = () => {
  document.querySelector("#main-content").className = "main-content hidden";

  document.querySelector("#locations-sidebar").className =
    "locations-sidebar hidden";

  document.body.appendChild(createErrorMessage());
};

const removeErrorMessage = () => {
  const errorMessage = document.querySelector("body > .error-message");
  if (errorMessage) document.body.removeChild(errorMessage);
};

function createErrorMessage() {
  return createTextElement(
    "div",
    "error-message",
    "Weather information cannot be retrieved at this time.",
  );
}

export { displayErrorMessage, removeErrorMessage };
