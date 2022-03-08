import React, { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { deserializeConfiguration } from "../../utils/deserialization";
import { signupWithUsername, loginWithUsername, signupWithWechat } from "../../utils/helpers";
import { setAllTasks } from "../../store/tasksSlice";
import { setAllCards } from "../../store/cardsSlice";
import { setUser } from "../../store/userSlice";
import { setAllUserTaskMaps } from "../../store/userTaskMapsSlice";
import API from "../../api/axios";

export default function LoginForm({ page, done }) {
  const [loginStatus, setLoginStatus] = useState({
    username: undefined,
    password: undefined,
    error: false,
    errorMessage: undefined,
    spinner: "invisible",
  });
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoginStatus({ ...loginStatus, spinner: "visible" });

    if (!loginStatus.username || !loginStatus.password)
      return setLoginStatus({
        ...loginStatus,
        error: true,
        errorMessage: "请填写正确的用户名和密码",
      });

    let result;

    switch (page) {
      case "Login":
        result = await loginWithUsername({
          username: loginStatus.username,
          password: loginStatus.password,
        });
        break;
      case "Signup":
        result = await signupWithUsername({
          username: loginStatus.username,
          password: loginStatus.password,
        });
        break;
      case "Wechat":
        result = await signupWithWechat({
          username: loginStatus.username,
          password: loginStatus.password,
          unionId: Cookies.get("unionId"),
        });
        break;
      default:
        return (window.location.href = `${window.location.protocol}//${window.location.host}/app`);
    }

    result.status === 404 &&
      setLoginStatus({ ...loginStatus, error: true, errorMessage: result.data.error.message, spinner: "invisible" });

    if (!result.data.user) return;

    const { _id, name, accessToken, refreshToken } = result.data.user;
    if (_id && accessToken && name && refreshToken) {
      Cookies.set("userId", _id, { sameSite: "Strict" });
      Cookies.set("userName", name, { sameSite: "Strict" });
      Cookies.set("accessToken", accessToken, { sameSite: "Strict" });
      Cookies.set("refreshToken", refreshToken, { sameSite: "Strict" });

      const url = `user/${Cookies.get("userId")}/get/`;
      const userResult = await API.get(url);
      const deserializedUserData = deserializeConfiguration(userResult.data)
      const user = deserializedUserData.user;
      let [ tasks, cards, userTaskMaps ] = [ [], [], [] ]

      // headimgurl
      if (user.headimgurl) Cookies.set("headimgurl", user.headimgurl, { sameSite: "Strict" });
      // email
      Cookies.set("email", user.email, { sameSite: "Strict" });

      dispatch(setAllTasks(tasks));
      dispatch(setAllCards(cards));
      dispatch(setAllUserTaskMaps(userTaskMaps));
      dispatch(setUser(user));

      setLoginStatus({
        username: undefined,
        password: undefined,
        error: false,
        errorMessage: undefined,
        spinner: "invisible",
      });
      done();
    }
  };

  return (
    <form>
      {page === "Wechat" && (
        <div style={{ width: "275px", margin: "auto", fontSize: "12px" }}>
          *请为您的微信关联账户设置用户名和密码，以后可以用此用户名和密码直接登录噢
        </div>
      )}
      <div
        htmlFor="username"
        className="input-style input-transparent has-borders has-icon validate-field mb-4"
        style={{ width: "275px", margin: "auto" }}
      >
        <i className="fa fa-user color-black"></i>
        <input
          name="username"
          type="text"
          id="username"
          className="font-16 form-control color-black"
          placeholder="用户名"
          required
          onChange={(e) => setLoginStatus({ ...loginStatus, username: e.target.value })}
          spellCheck="false"
        />
      </div>
      <div
        htmlFor="password"
        className="input-style input-transparent has-borders has-icon validate-field mb-4"
        style={{ width: "275px", margin: "auto" }}
      >
        <i className="fa fa-lock color-black"></i>
        <input
          name="password"
          type="password"
          id="password"
          className="font-16 form-control validate-password color-black"
          placeholder="密码"
          required
          onChange={(e) => setLoginStatus({ ...loginStatus, password: e.target.value })}
        />
      </div>
      <div className="content text-center" style={{ color: "red" }}>
        {loginStatus.error && `*${loginStatus.errorMessage}`}
      </div>
      <div className="content text-center">
        <button
          name={page === "Login" ? "login" : "signup"}
          className="font-16 btn bg-dark-dark btn-center-m mt-3 mb-0 rounded-l border m-1"
          type="submit"
          value={page === "Login" ? "login" : "signup"}
          onClick={(e) => onSubmit(e)}
        >
          {page === "Login" ? "登 录" : "注 册"}
        </button>
      </div>
      <div className="content text-center">
        <span className={`spinner-border ${loginStatus.spinner}`}></span>
      </div>
    </form>
  );
}
