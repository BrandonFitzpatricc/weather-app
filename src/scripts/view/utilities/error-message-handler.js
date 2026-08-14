import { createTextElement } from "./element-factory";

const displayErrorMessage = () => {
  document.querySelector("#main-content").className = "main-content hidden";

  document.querySelector("#locations-sidebar").className =
    "locations-sidebar hidden";

  document.body.appendChild(createErrorMessage());
};

function createErrorMessage() {
  return createTextElement(
    "div",
    "error-message",
    "Weather information cannot be retrieved at this time.",
  );
}

export { displayErrorMessage };
