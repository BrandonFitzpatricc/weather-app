import "../stylesheets/custom-reset.css";
import "../stylesheets/style.css";

import { startup } from "./application-initializer";

// Temporary import to ensure the form controller is detected as a dependency.
import { checkErrors } from "./form-controller";

startup();