import React from "react";
import PropTypes from "prop-types";

const RegistrationFormComponent = ({ userDetail, ...params }) => {
  return (
    <div className="form">
      <form
        className="register-form"
        name="register-form"
        onSubmit={params.submitForm}
      >
        <input
          type="text"
          placeholder="name"
          name="name"
          value={userDetail.name}
          onChange={params.handleChange}
        />
        <input
          type="text"
          placeholder="email address"
          name="email"
          value={userDetail.email}
          onChange={params.handleChange}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          autoComplete="new-password"
          value={userDetail.password}
          onChange={params.handleChange}
        />
        <button type="submit">create</button>
        <p className="message">
          Already registered?
          <span onClick={params.toggleForms}>Sign In</span>
        </p>
      </form>
    </div>
  );
};

RegistrationFormComponent.protoType = {
  submitForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleForms: PropTypes.func.isRequired,
  userDetail: PropTypes.object.isRequired
};

export default RegistrationFormComponent;
