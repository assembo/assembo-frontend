import { COLORARRAY } from "../constants/constants";
import API from "../api/axios";
import { deserializeConfiguration } from "./deserialization";

/**
 * get user logo
 * @param {string} headimgurl
 *      head image url from wechat
 * @param {string} username
 *      username for generating letter logo
 * @returns {string} image src
 * */
export const getUserLogo = (headimgurl, username) => {
  if (headimgurl && headimgurl !== undefined) return headimgurl;
  return getLetterLogo(username ? username : "USER", "hash", "");
};

/**
 * get user letter logo with the username
 * @param {string} username
 * @param {string} mode
 *      hash: hash ; !hash: use bgColor
 * @param {string} bgColor
 *      bgColor of the canvas
 * */
export const getLetterLogo = (username, mode, bgColor) => {
  let drawing = document.createElement("canvas");

  drawing.setAttribute("width", "32px");
  drawing.setAttribute("height", "32px");

  if (drawing.getContext) {
    let context = drawing.getContext("2d");

    context.clearRect(0, 0, 32, 32);

    // draw the circle - the border
    context.beginPath();
    context.arc(16, 16, 15, 0, 2 * Math.PI, false);

    // fill the circle
    let color = "";

    if (mode === "hash") {
      let hash = 0;

      for (let i = 0; i < username.length; i++) {
        hash += username.charCodeAt(i);
      }

      color = COLORARRAY[hash % COLORARRAY.length];
    } else color = bgColor;

    context.fillStyle = color;
    context.fill();

    // draw the word
    context.font = "15px Sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.strokeStyle = "red";
    context.fillStyle = "#FFFFFF";
    context.fillText(username[0], 16, 17, 33);

    // convert to img src
    const dataUrl = drawing.toDataURL();

    return dataUrl;
  }
};

/**
 * update user nickname
 * @param {string} userId
 * @param {string} nickname
 *      hash: hash ; !hash: use bgColor
 * @param {string} bgColor
 *      bgColor of the canvas
 * */
export const updateName = async ({ userId, nickname }) => {
  try {
    const result = await API.post("user/update/name/", {
      userId,
      nickname,
    });
    return result;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};

/**
 * get user info from db
 * @param {string} userId
 * */
export const getUser = async (userId) => {
  try {
    const url = `user/${userId}/get/`;
    const result = await API.get(url);
    const data = result.data;
    const deserializedUserData = deserializeConfiguration(data);
    const user = deserializedUserData.user;
    return user;
  } catch (error) {
    console.error(error);
    return error.response;
  }
}
