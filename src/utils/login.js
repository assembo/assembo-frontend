import API from "../api/axios";
import { ASSEMBOWEBAPPSCOPE, ASSEMBOWEBAPPREDIRECT, ASSEMBOOASCOPE } from "../constants/constants";
import { ASSEMBOOAID, ASSEMBOWEBAPPID, ASSEMBOWEBAPPSTATE } from "../secret/secret";

/**
 * user login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {data: {accessToken: string, refreshToken: string, username: string, userId: string}} if valid input
 * @returns {data: {message}} if invalid input
 * */
export const loginWithUsername = async ({ username, password }) => {
  try {
    const result = await API.post("login/username/", {
      username,
      password,
    });
    return result;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

/**
 * user login with wechat
 * @param {string} code   temporary code to get the access_token
 * @param {string} state  state to check if the request is valid (e.g. from wechat)
 * @returns {data: {accessToken: string, refreshToken: string, username: string, userId: string, emailExisted: boolean}}
 * */
export const loginWithWechat = async (code, state) => {
  try {
    const result = await API.post("login/wechat/", {
      code,
      state,
    });
    return result;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

/**
 * get the pc wechat login qr code
 * @returns {string} pc wechat login url
 * */
export const getPCWechatLoginUrl = () => {
  return `https://open.weixin.qq.com/connect/qrconnect?appid=${ASSEMBOWEBAPPID}&
    redirect_uri=${encodeURI(
      ASSEMBOWEBAPPREDIRECT
    )}&response_type=code&scope=${ASSEMBOWEBAPPSCOPE}&state=${ASSEMBOWEBAPPSTATE}#wechat_redirect`;
};

/**
 * get the mobile wechat login url
 * @returns {string} mobile wechat login url
 * */
export const getMobileWechatLoginUrl = () => {
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${ASSEMBOOAID}&
    redirect_uri=${encodeURI(
      ASSEMBOWEBAPPREDIRECT
    )}&response_type=code&scope=${ASSEMBOOASCOPE}&state=${ASSEMBOWEBAPPSTATE}#wechat_redirect`;
};
