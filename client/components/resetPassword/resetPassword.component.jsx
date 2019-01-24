import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./resetPassword.component.scss";
import ApiService from "../../service/api.service";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ischangePaswordFrom: false,
      formVal: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      resetpasswordDetails: { resetToken: "", email: "" }
    };

    this.handleChange = this.handleChange.bind(this);
    this.setFormFields = this.setFormFields.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target,
      formObj = Object.assign({}, this.state.formVal);

    formObj[name] = value;
    this.setState({ formVal: formObj });
  }

  submitForm(e) {
    e.preventDefault();

    if (this.state.ischangePaswordFrom) {
      const resetPdReqObj = {
        resetToken: this.state.resetpasswordDetails.resetToken,
        password: this.state.formVal.password,
        confirmPassword: this.state.formVal.confirmPassword,
        email: this.state.resetpasswordDetails.email
      };

      ApiService.resetPassword(resetPdReqObj).then(
        res => {
          console.log(res);
          this.setState({ message: res.message });
        },
        err => {
          console.log(err);
          this.setState({ message: err.message });
        }
      );
    } else {
      const verifyReqObj = { email: this.state.formVal.email };

      ApiService.verifyUser(verifyReqObj).then(
        res => {
          this.setState({
            resetpasswordDetails: {
              resetToken: res.resetToken,
              email: res.email
            },
            ischangePaswordFrom: true
          });
        },
        err => {
          console.log(err);
          this.setState({ message: err.message });
        }
      );
    }
  }

  setFormFields() {}

  render() {
    const usernameForm = (
        <Fragment>
          <input
            type="text"
            placeholder="username"
            name="email"
            value={this.state.formVal.email}
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
            value={this.state.formVal.password}
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
        <div className="pull-right go-to-login">
          <Link className="btn btn-info" to="/">
            Login
          </Link>
        </div>
        <div className="form">
          <h4>Reset Password</h4>
          <form onSubmit={this.submitForm.bind(this)}>
            {this.state.ischangePaswordFrom ? changePasswordForm : usernameForm}
            {this.state.message ? (
              <p className="alert alert-info">{this.state.message}</p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
