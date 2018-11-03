import React from "react";
import { Switch, Route } from "react-router-dom";
import loginComponent from "./components/login/login.component";
import HomeComponent from "./components/home/home.component";

export default (
  <Switch>
    <Route exact path="/" component={loginComponent} />
    <Route exact path="/home" component={HomeComponent} />
  </Switch>
);
