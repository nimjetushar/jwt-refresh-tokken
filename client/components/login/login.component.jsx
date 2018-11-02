import React, { Component } from "react";
import "./login.component.scss";
import PropTypes from "prop-types";

import RegistrationFormComponent from "./registrationForm.component";
import LoginFormComponent from "./loginForm.component";
import { createUser, login } from "../../api";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.regForm = {
      name: "",
      email: "",
      password: ""
    };
    this.loginForm = {
      username: "",
      password: ""
    };

    this.state = {
      loginForm: this.loginForm,
      registrationForm: this.regForm,
      isRegistrationForm: false
    };

    this.bindThis();
  }

  bindThis() {
    this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handleRegFormChange = this.handleRegFormChange.bind(this);
    this.toggleForms = this.toggleForms.bind(this);
    this.login = this.login.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  login(e) {
    e.preventDefault();
    login(this.state.loginForm);
  }

  createUser(e) {
    e.preventDefault();
    const data = Object.assign({}, this.state.registrationForm);
    createUser(data).then(
      res => {
        this.setState({ regForm: Object.assign({}, this.regForm) });
      },
      err => {
        this.setState({ regForm: Object.assign({}, this.regForm) });
      }
    );
  }

  handleLoginFormChange(e) {
    const formObj = this.state.loginForm;
    this.handleChange(e, formObj);
  }

  handleRegFormChange(e) {
    const formObj = this.state.registrationForm;
    this.handleChange(e, formObj);
  }

  handleChange(e, formObj) {
    const { name, value } = e.target;
    formObj[name] = value;
    this.setState({ currentForm: formObj });
  }

  toggleForms() {
    this.setState({ isRegistrationForm: !this.state.isRegistrationForm });
  }

  render() {
    return (
      <div className="login-page">
        {this.state.isRegistrationForm ? (
          <RegistrationFormComponent
            userDetail={this.state.registrationForm}
            handleChange={this.handleRegFormChange}
            toggleForms={this.toggleForms}
            submitForm={this.createUser}
          />
        ) : (
          <LoginFormComponent
            loginDetail={this.state.loginForm}
            handleChange={this.handleLoginFormChange}
            toggleForms={this.toggleForms}
            submitForm={this.login}
          />
        )}
      </div>
    );
  }
}

LoginComponent.propTypes = {
  loginForm: PropTypes.objectOf({
    username: PropTypes.string,
    password: PropTypes.string
  }),
  registrationForm: PropTypes.objectOf({
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string
  }),
  isRegistrationForm: PropTypes.bool,
  loginUser: PropTypes.func.isRequired
};

export default LoginComponent;
