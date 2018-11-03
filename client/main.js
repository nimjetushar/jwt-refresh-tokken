import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css"

import Routes from "./routes";

ReactDOM.render(
  <BrowserRouter>{Routes}</BrowserRouter>,
  document.getElementById("container")
);
