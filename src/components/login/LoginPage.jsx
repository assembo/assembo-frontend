import React, { Component } from "react";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import LoginHeader from "../BaseComponents/LoginHeader";
import LoginForm from "../BaseComponents/LoginForm";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: undefined,
    };
  }

  done = () => {
    console.log("-- LoginPage.jsx done() --");
    this.props.done();
    this.setState({ redirect: true });
  };

  render() {
    console.log("-- LoginPage.jsx render() --");
    if (this.state.redirect && Cookies.get("inviteId")) return <Redirect to="/invite" />;
    if (this.state.redirect) return <Redirect to="/meetingCenter" />;

    return (
      <div className="vertical-center container">
        <LoginHeader />
        <LoginForm page="Login" done={this.done} />
      </div>
    );
  }
}

export default LoginPage;
