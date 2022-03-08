import API from "../api/axios";

/**
 * user signup with username and password
 * @param {string} username
 * @param {string} password
 * @returns {data: {accessToken: string, refreshToken: string, username: string, userId: string}} if valid input
 * @returns {data: {message: string}} if invlid input
 * */
export const signupWithUsername = async ({ username, password }) => {
  try {
    const result = await API.post("signup/username/", {
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
 * user signup with wechat
 *      link to username and password for future alternative login
 * @param {string} username
 * @param {string} password
 * @param {string} userId
 * @returns {{accessToken: string, refreshToken: string, username: string, userId: string}} if valid input
 * @returns {data: {message: string}} if invalid input
 * */
export const signupWithWechat = async ({ username, password, userId }) => {
  try {
    const result = await API.post("signup/wechat/", {
      username,
      password,
      userId,
    });
    return result;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
