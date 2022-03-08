import React, { Component } from "react";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import { destinations, theme } from "./constants/constants";
import { ThemeProvider } from '@material-ui/core/styles';

// files
import Login from "./components/login/Login";
import LoginPage from "./components/login/LoginPage";
import SignupPage from "./components/login/SignupPage";
import WechatLogin from "./components/login/WechatLoginPage";
import MeetingCenter from "./components/MeetingCenter/MeetingCenter";
import WechatMobileSignup from "./components/login/WechatMobileSignup";
import RestoreData from "./components/BaseComponents/RestoreData";
import "./style/AssemboColors.css";
import "./style/Border.css";
import "./style/TextStyle.css";
import "./style/Calendar.css";
import "./style/Quill.css";
import "./style/Cards.css";
import SidebarLayout from "./components/BaseComponents/SideBar/SideBarLayout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: false,
    };
    this.checkInvite();
  }

  checkInvite = () => {
    //if from invite, set invite cookies
    const url = window.location.href;
    if (url.indexOf("invite") !== -1) {
      //remove potential syntax error
      const inviteId = url.split("/invite/")[1].endsWith("/")
        ? url.split("/invite/")[1].split("/")[0]
        : url.split("/invite/")[1];
      Cookies.set("inviteId", inviteId, { sameSite: "Strict" });
    }
  };

  rerender = () => {
    this.setState({ switch: !this.state.switch });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router basename="/app">
            <Switch>
              <Route path="/" exact>
                <Login />
              </Route>
              <Route path="/login" exact>
                <LoginPage done={this.rerender} />
              </Route>
              <Route path="/signup" exact>
                <SignupPage done={this.rerender} />
              </Route>
              <Route path="/wechat/login">
                <WechatLogin done={this.rerender} />
              </Route>
              <Route path="/wechat/signup">
                <WechatMobileSignup done={this.rerender} />
              </Route>
              {!Cookies.get("accessToken") && <Redirect to="/login" />}
              <SidebarLayout>
                <Route path="/meetingCenter">
                < RestoreData content={<MeetingCenter rerender={this.rerender} />} dest={destinations.TASKS} />
                </Route>
              </SidebarLayout>
                <Route path="*">
                  <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
