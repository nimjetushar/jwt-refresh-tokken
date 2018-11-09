import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import loginComponent from "./components/login/login.component";
import HomeComponent from "./components/home/home.component";

class Main extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={loginComponent} />
          <Route exact path="/home" component={HomeComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("container"));
