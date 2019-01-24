import React, { Component } from "react";
import "./login.component.scss";
import PropTypes from "prop-types";

import RegistrationFormComponent from "./registrationForm.component";
import LoginFormComponent from "./loginForm.component";
import ApiService from "../../service/api.service";

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
    this.handleChange = this.handleChange.bind(this);
    this.toggleForms = this.toggleForms.bind(this);
    this.login = this.login.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  login(e) {
    e.preventDefault();
    ApiService.login(this.state.loginForm)
      .then(() => {
        this.props.history.push("/home");
      })
      .catch(err => {
        this.setState({ errorMsg: err.message });
      });
  }

  createUser(e) {
    e.preventDefault();
    const data = Object.assign({}, this.state.registrationForm);

    ApiService.createUser(data).then(
      () => {
        this.toggleForms();
        this.setState({ regForm: Object.assign({}, this.regForm) });
      },
      () => {
        this.setState({ regForm: Object.assign({}, this.regForm) });
      }
    );
  }

  handleChange(e) {
    const { name, value, form } = e.target,
      formName = form.name;
    let formObj = {},
      currentForm;

    if (formName === "login-form") {
      formObj = Object.assign({}, this.state.loginForm);
      currentForm = "loginForm";
    } else {
      formObj = Object.assign({}, this.state.registrationForm);
      currentForm = "registrationForm";
    }

    formObj[name] = value;
    this.setState({ [currentForm]: formObj });
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
            handleChange={this.handleChange}
            toggleForms={this.toggleForms}
            submitForm={this.createUser}
          />
        ) : (
          <LoginFormComponent
            loginDetail={this.state.loginForm}
            handleChange={this.handleChange}
            toggleForms={this.toggleForms}
            submitForm={this.login}
            errorMsg={this.state.errorMsg}
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
  isRegistrationForm: PropTypes.bool
};

export default LoginComponent;
