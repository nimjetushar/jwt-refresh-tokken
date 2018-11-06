import React from "react";
import PropTypes from "prop-types";

const LoginFormComponent = ({ loginDetail, ...params }) => {
  return (
    <div className="form">
      <form className="login-form" name="login-form" onSubmit={params.submitForm}>
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
          Not registered?
          <span onClick={params.toggleForms}>Create an account</span>
        </p>
      </form>
    </div>
  );
};

LoginFormComponent.protoType = {
  submitForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleForms: PropTypes.func.isRequired,
  loginDetail: PropTypes.object.handleChange
};

export default LoginFormComponent;
