import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { startup } from "./data-loader";

// Temporary import to ensure the form controller is detected as a dependency.
import { checkErrors } from "./form-controller";

// startup();