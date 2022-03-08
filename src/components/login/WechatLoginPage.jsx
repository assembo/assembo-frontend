import React, { Component } from "react";
import { Redirect } from "react-router";
import Cookies from "js-cookie";
import { loginWithWechat } from "../../utils/helpers";
import { deserializeConfiguration } from "../../utils/deserialization";
import LoginHeader from "../BaseComponents/LoginHeader";
import LoginForm from "../BaseComponents/LoginForm";
import { SyncLoader } from "react-spinners";
import { setAllTasks } from "../../store/tasksSlice";
import { setAllCards } from "../../store/cardsSlice";
import { setUser } from "../../store/userSlice";
import { setAllUserTaskMaps } from "../../store/userTaskMapsSlice";
import { connect } from "react-redux";
import API from "../../api/axios";

// only for PC users to login with wechat (servers as redirect page)

class WechatLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: undefined,
      message: undefined,
    };
  }

  async componentDidMount() {
    console.log("-- WechatLogin.jsx componentDidMount --");
    await this.getWechatData();
  }

  getWechatData = async () => {
    console.log("-- WechatLogin.jsx getWechatData() --");

    //sample url = https://www.assembo.cc/app/wechat/login?code=CODE&state=STATE

    let data = window.location.href.split("?");

    // no query data or not two query data
    if (data.length === 1 || data[1].split("&").length !== 2)
      return (window.location.href = `${window.location.protocol}//${window.location.host}/app`);

    data = data[1].split("&");

    if (data[0].split("=")[0] !== "code" || data[1].split("=")[0] !== "state")
      return (window.location.href = `${window.location.protocol}//${window.location.host}/app`);

    const code = data[0].split("=")[1];
    const state = data[1].split("=")[1];

    const result = await loginWithWechat(code, state);

    //server return no error and also valid tokens are returned
    if (!result.data.user) return;
    const { _id, name, accessToken, refreshToken } = result.data.user;
    if (_id && accessToken && name && refreshToken) {
      // if (!result.data.user.wechatExisted) {
      //   Cookies.set("unionId", result.data.user.unionId, { sameSite: "Strict" });
      //   document.getElementById("btn-wechatTarget").click();
      // } else {
      this.setState({ message: "exist" });
      Cookies.set("userId", _id, { sameSite: "Strict" });
      Cookies.set("userName", name, { sameSite: "Strict" });
      Cookies.set("accessToken", accessToken, { sameSite: "Strict" });
      Cookies.set("refreshToken", refreshToken, { sameSite: "Strict" });

      // get user data and update store
      const url = `user/${Cookies.get("userId")}/get/`;
      const userResult = await API.get(url);
      const deserializedUserData = deserializeConfiguration(userResult.data);
      const user = deserializedUserData.user;
      let [tasks, cards, userTaskMaps] = [[], [], []];

      // headimgurl
      if (user.headimgurl) Cookies.set("headimgurl", user.headimgurl, { sameSite: "Strict" });
      // email
      Cookies.set("email", user.email, { sameSite: "Strict" });

      this.props.setAllTasks(tasks);
      this.props.setAllCards(cards);
      this.props.setUser(user);
      this.props.setAllUserTaskMaps(userTaskMaps);

      this.done();
      // }
    }
  };

  done = () => {
    console.log("-- WechatLoginPage.jsx done() --");
    Cookies.remove("unionId", { sameSite: "Strict" });
    if (this.state.message === undefined) document.getElementById("btn-wechatTarget").click();
    this.props.done();
    this.setState({ redirect: true });
  };

  render() {
    console.log("-- WechatLoginPage.jsx render() --");
    if (this.state.redirect && Cookies.get("inviteId")) return <Redirect to="/invite" />;
    if (this.state.redirect) return <Redirect to="/meetingCenter" />;

    return (
      <div>
        <div style={{ position: "absolute", top: "48%", left: "44%" }}>
          <SyncLoader color="#434A54" />
        </div>
        <div>
          <button id="btn-wechatTarget" data-bs-toggle="modal" data-bs-target="#wechatModal" className="btn disabled">
            click
          </button>
        </div>
        <div
          className="modal fade"
          id="wechatModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" style={{ margin: "center" }} role="document">
            <div className="modal-content assembo-border-radius__standard" >
              <LoginHeader />
              <LoginForm page="Wechat" done={this.done} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks.value,
  cards: state.cards.value,
  userTaskMaps: state.userTaskMaps.value,
  user: state.user.value,
});

const mapDispatchToProps = {
  setAllTasks,
  setAllCards,
  setUser,
  setAllUserTaskMaps,
};

export default connect(mapStateToProps, mapDispatchToProps)(WechatLoginPage);
