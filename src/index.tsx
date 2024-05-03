import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);


// StrictMode will run twice in development mode, but only once in production mode.
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
