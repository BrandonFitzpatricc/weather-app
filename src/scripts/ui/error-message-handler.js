import { createErrorMessage } from "./element-factory";

const displayErrorMessage = () => {
  document.body.appendChild(createErrorMessage());
};

export { displayErrorMessage };
