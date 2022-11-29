import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import store from "./redux/store";
import "./css/style.css";
import "./App.css"
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}>
      <App />
    </BrowserRouter>
  </Provider>
);
