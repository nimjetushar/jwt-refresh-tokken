import React from "react";
import { Switch, Route } from "react-router-dom";
import loginComponent from "./components/login/login.component";

export default (
  <Switch>
    <Route exact path="/" component={loginComponent} />
  </Switch>
);
