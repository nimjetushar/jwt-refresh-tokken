import React, { Component, Fragment } from "react";
import "./resetPassword.component.scss";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ischangePaswordFrom: false,
      formVal: {
        username: "",
        password: "",
        confirmPassword: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.setFormFields = this.setFormFields.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
  }

  submitForm(e) {
    e.preventDefault();
  }

  setFormFields() {}

  render() {
    const usernameForm = (
        <Fragment>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={this.state.formVal.username}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </Fragment>
      ),
      changePasswordForm = (
        <Fragment>
          <input
            type="text"
            placeholder="password"
            name="password"
            value={this.state.formVal.username}
            onChange={this.handleChange}
            autoComplete="new-password"
          />
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={this.state.formVal.confirmPassword}
            onChange={this.handleChange}
            autoComplete="new-password"
          />
          <button type="submit">Change Password</button>
        </Fragment>
      );

    return (
      <div className="reset-password-wrapper">
        <div className="form">
          <h4>Reset Password</h4>
          <form onSubmit={this.submitForm.bind(this)}>
            {this.state.ischangePaswordFrom ? changePasswordForm : usernameForm}
          </form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
