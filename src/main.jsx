import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Store from "./store/Store.jsx";
import { Provider } from "react-redux";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <BrowserRouter>
      <Analytics>
        <App />
      </Analytics>
    </BrowserRouter>
  </Provider>
);
