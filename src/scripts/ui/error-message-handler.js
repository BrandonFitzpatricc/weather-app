import { createErrorMessage } from "./element-factory";

const displayErrorMessage = () => {
  document.querySelector("#main-content").className = "main-content hidden";
  document.querySelector("#locations-sidebar").className = "locations-sidebar hidden";
  document.body.appendChild(createErrorMessage());
};

export { displayErrorMessage };
