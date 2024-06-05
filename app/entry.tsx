import React from "react";
import ReactDOM from "react-dom/client";
import "@locello/ui/styles/global-styles.scss";
import App from "./app";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
