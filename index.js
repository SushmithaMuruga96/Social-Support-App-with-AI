import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./src/Components/Home.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Home />
  </Provider>
);
