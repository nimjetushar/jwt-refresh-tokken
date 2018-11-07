import React, { Component } from "react";
import "./home.component.scss";
import { getData } from "../../api";

class HomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      successMsg: "",
      errorMsg: "",
      isloading: false
    };
  }

  verifyToken() {
    this.setState({ isloading: true });
    getData()
      .then(res => {
        this.setState({
          successMsg: "Token is valid",
          errorMsg: "",
          isloading: false
        });
      })
      .catch(err => {
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
        <div className="spacer">{this.tokenMsg.call(this)}</div>
      </div>
    );
  }
}

export default HomeComponent;
