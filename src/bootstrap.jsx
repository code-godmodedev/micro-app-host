import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { withDevTools } from "gmd-mf-widget-loader";
import "./App.css";
import getRemotes from "./utils/getRemotes";

const AppWithDevTools = withDevTools(App);

const remotes = await getRemotes();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="content">
      <AppWithDevTools app="jsHost" remotes={remotes} />
    </div>
  </React.StrictMode>
);
