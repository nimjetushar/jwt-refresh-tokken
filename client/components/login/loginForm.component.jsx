import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LoginFormComponent = ({ loginDetail, ...params }) => {
  return (
    <div className="form">
      <form
        className="login-form"
        name="login-form"
        onSubmit={params.submitForm}
      >
        <input
          type="text"
          placeholder="username"
          name="username"
          value={loginDetail.username}
          onChange={params.handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={loginDetail.password}
          onChange={params.handleChange}
          autoComplete="new-password"
        />
        <button type="submit">login</button>
        <p className="message">
          <span className="pull-left" onClick={params.toggleForms}>
            Create an account
          </span>
          &nbsp;
          <span className="pull-right">
            <Link to="resetpassword">Forget password</Link>
          </span>
        </p>
        {params.errorMsg ? (
          <p className="message error">{params.errorMsg}</p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

LoginFormComponent.protoType = {
  submitForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleForms: PropTypes.func.isRequired,
  loginDetail: PropTypes.object.handleChange,
  errorMsg: PropTypes.string.isRequired
};

export default LoginFormComponent;
