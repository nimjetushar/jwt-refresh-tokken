import React, { Component } from "react";
import "./home.component.scss";
import { getData, logout } from "../../api";
import AuthService from "../../service/auth.service";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successMsg: "",
      errorMsg: "",
      isloading: false
    };

    this.tokenMsg = this.tokenMsg.bind(this);
  }

  verifyToken() {
    this.setState({ isloading: true });
    getData()
      .then(() => {
        this.setState({
          successMsg: "Token is valid",
          errorMsg: "",
          isloading: false
        });
      })
      .catch(() => {
        this.setState({
          errorMsg: "Token is invalid",
          successMsg: "",
          isloading: false
        });
      });
  }

  tokenMsg() {
    if (this.state.successMsg) {
      return <div className="alert alert-success">{this.state.successMsg}</div>;
    }
    if (this.state.errorMsg) {
      return <div className="alert alert-danger">{this.state.errorMsg}</div>;
    }
    if (this.state.isloading) {
      return <div className="alert alert-info">Loading...</div>;
    }
  }

  logout() {
    logout();
    new AuthService().logout();
    this.props.history.push("/");
  }

  navigateToLogin() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="container home-page">
        <h2 className="alert alert-info">Login Successfull !!!</h2>
        <div className="spacer">
          <button
            className="btn btn-primary ml"
            onClick={this.navigateToLogin.bind(this)}
          >
            Go to login
          </button>
          <button
            className="btn btn-primary ml"
            onClick={this.logout.bind(this)}
          >
            Logout
          </button>
        </div>
        <div className="spacer">
          <span>Click button to verify token</span>
          <button
            className="btn btn-primary ml"
            onClick={this.verifyToken.bind(this)}
          >
            Verify Token
          </button>
        </div>
        <div className="spacer">{this.tokenMsg()}</div>
      </div>
    );
  }
}

export default HomeComponent;
