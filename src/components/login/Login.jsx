import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import { SocialIcon } from "react-social-icons";
import { getWechatLoginLink } from "../../utils/helpers";
import LoginHeader from "../BaseComponents/LoginHeader";

class Login extends Component {
  toWechat = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx69ed5dfefbea409f&redirect_uri=https%3A%2F%2Fwww.assembo.cc%2Fapp%2Fwechat%2Fsignup&response_type=code&scope=snsapi_userinfo&state=secretstate#wechat_redirect";
    else window.location.href = getWechatLoginLink();
  };

  render() {
    if (Cookies.get("accessToken")) return <Redirect to="/meetingCenter" />;
    return (
      <div>
        <div className="vertical-center container login-container">
          <LoginHeader />
          <div className="container" align="center" style={{ margin: "auto" }}>
            <Link to="/login">
              <button className="mt-5 mb-3 font-16 btn border btn-center-m rounded-l" style={{ margin: "auto" }}>
                登 录
              </button>
            </Link>
            <br />
            <Link to="/signup">
              <button className="mb-5 font-16 btn bg-dark-dark btn-center-m btn-primary rounded-l border m-2">
                注 册
              </button>
            </Link>
            <div className="container">
              <div className="container">
                <button className="btn" onClick={this.toWechat}>
                  <SocialIcon network="wechat" bgColor="#434A54" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: "0px",
            bottom: "0px"
          }}
        >V010.1</div>
      </div>
    );
  }
}

export default Login;
