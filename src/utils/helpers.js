import axios from "axios";
import API from "../api/axios";
import { COLORARRAY } from "../constants/constants";
import Bmob from "hydrogen-js-sdk";
import { deserializeConfiguration, deserializeUsers } from "./deserialization";

/**
 * a function to detect if user device is mobile
 * @returns boolean indicate if user device is mobile
 */
export const detectMobile = ()=>{
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];
  
  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
};

export const getCard = (cardData, userTaskMaps) => {
  const title = cardData.title;
  const taskId = cardData.taskId ? cardData.taskId : "NO_TASK";
  let userName = "AssemboTeam";
  const updatedBy = cardData.updatedBy;
  if (cardData.createdBy) {
    const relevantUserTaskMap = userTaskMaps.find((userTaskMap) => {
      return userTaskMap.taskId === taskId && userTaskMap.userId === cardData.createdBy;
    });
    userName = relevantUserTaskMap ? relevantUserTaskMap.userName : userName;
  }
  const createDate = cardData.createDate ? new Date(cardData.createDate).toISOString().split("T")[0] : "Unknown";
  const updateDate = cardData.updateDate ? new Date(cardData.updateDate).toISOString().split("T")[0] : "Unknown";
  let abstract = cardData.description.substring(0, 100);
  abstract = cardData.description.length > 100 ? abstract + "..." : abstract;
  return {
    _id: cardData._id,
    title,
    abstract,
    originalText: cardData.description,
    taskId,
    userName,
    updatedBy,
    updateDate,
    createDate,
    read: cardData.read ? cardData.read : false,
  };
};

/**
 * a helper to create a specific card
 * @param {title} string
 * @param {description} string
 * @param {createdBy} string
 * @param {taskId} string
 * */
export const createCard = async ({ title, description, createdBy, taskId, link }) => {
  console.log("-- createCard(helper) --");
  console.log("createCard - ", title, link);

  // data validation
  if (!title || !createdBy) {
    return;
  }

  try {
    const createDate = new Date().toUTCString();
    const result = await API.post("card/create/", {
      title,
      description,
      taskId,
      createdBy,
      createDate,
      link,
    });
    const cardId = result.data.cardData._id;
    const cardData = {
      _id: cardId,
      title,
      description,
      taskId,
      createdBy,
      createDate,
      updatedBy: createdBy,
      updateDate: createDate,
      updateUserName: "",
      link,
    };
    return cardData;
  } catch (error) {
    console.error(error);
  }
};

export const updateCard = async (cardId, cardToUpdate) => {
  if (!cardToUpdate || !cardId) return;
  try {
    const updateDate = new Date().toUTCString();
    const cardData = {
      ...cardToUpdate,
      updateDate,
    };
    const url = `card/${cardId}/update/`;
    const result = await API.post(url, cardData);
    const updatedCardData = result.data.card;
    return updatedCardData;
  } catch (error) {
    console.error(error);
  }
};

export const updateCardTaskId = async (cardId, data) => {
  if (!data || !cardId) return;
  try {
    const updateDate = new Date().toUTCString();
    const cardData = {
      ...data,
      updateDate,
    };
    const url = `card/${cardId}/update_card_taskid/`;
    const result = await API.post(url, cardData);
    const updatedCardData = result.data.card;
    return updatedCardData;
  } catch (error) {
    console.error(error);
  }
};

/*

	Separate Lines

*/

// Tasks Operations

// Create Task -- modified
export const createTask = async ({
  title,
  description,
  creator,
  startDate,
  endDate,
  updateDate,
  link,
  tags,
  cardIds = [],
}) => {
  try {
    const result = await API.post("task/create/", {
      title,
      description,
      creator,
      startDate,
      endDate,
      updateDate,
      link,
      tags,
      cardIds,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Update Task
export const updateTask = async (taskId, taskToUpdate) => {
  if (!taskToUpdate) return;
  try {
    const updateDate = new Date().toUTCString();
    const updateTaskDate = {
      ...taskToUpdate,
      updateDate,
    };
    const url = `task/${taskId}/update/`;
    const result = await API.post(url, updateTaskDate);
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Delete Task
export const deleteTask = async (taskId) => {
  if (!taskId) {
    return;
  }
  try {
    const url = `task/${taskId}/delete/`;
    const result = await API.post(url);
    return result;
  } catch (error) {
    console.error(error);
  }
};

/**
 * a helper retrieve all users (collaborators) on a task
 * @param {string} taskId
 * @returns {Array} array of formatted users
 * */
export const getTaskCollaborators = async (taskId) => {
  if (!taskId) {
    return;
  }
  try {
    const url = `task/${taskId}/collaborators/`;
    const result = await API.get(url);
    const data = result.data;
    const rawUsers = data.users;
    const users = deserializeUsers(rawUsers);
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const summarize = async (text) => {
  if (!text) {
    return;
  }
  try {
    const url = `summarize/`;
    const result = await API.post(url, {
      text,
    });
    const data = result.data;
    if (data.keySentences.length > 0) {
      return data;
    } else {
      return {
        keySentences: [
          {
            sentence: text,
          },
        ],
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTimelinePercentage = (start, end) => {
  let timelinePercentage = (100 * (new Date() - start)) / (end - start);
  timelinePercentage = timelinePercentage > 100 || end < new Date() || start >= end ? 100 : timelinePercentage;
  return timelinePercentage;
};

export const dateISOStringFormatter = (date) => {
  return date.toISOString().split("T")[0];
};

// DONE
// Login Operations
export const loginWithUsername = async (user) => {
  try {
    const result = await API.post("user/login/", {
      userName: user.username,
      password: user.password,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

// DONE
export const loginWithWechat = async (code, state) => {
  try {
    const result = await API.post("wechat/login/", {
      code,
      state,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// DONE
export const mobileWechatSignup = async (code, state) => {
  try {
    const result = await API.post("wechat/mobile/signup/", {
      code,
      state,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// DONE
export const getWechatLoginLink = () => {
  // redirect to qr code page
  const appId = "wxd71ae0c56c06742c"; //从微信开放平台获取
  const redirectURI = encodeURI("https://www.assembo.cc/app/wechat/login");
  const scope = "snsapi_login"; //网页应用仅能填写这个
  const state = "secretstate";
  const url = `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectURI}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
  return url;
};

// DONE
// Signup Operations
export const signupWithUsername = async (user) => {
  try {
    const result = await API.post("user/create/", {
      userName: user.username,
      password: user.password,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

// DONE
export const signupWithWechat = async (user) => {
  try {
    const result = await API.post("wechat/user/create/", {
      userName: user.username,
      password: user.password,
      unionId: user.unionId,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

// DONE
// Invite Operations
export const addInviteTask = async (userId, taskId) => {
  console.log("in helper to invite_update");
  try {
    const result = await API.post("task/invite/", {
      userId,
      taskId,
    });
    console.log("invite_update result -", result);
    console.log("serial result -", deserializeConfiguration(result.data));
    return deserializeConfiguration(result.data);
  } catch (error) {
    console.error(error);
  }
};

// DONE
export const checkExistInviteTask = async (userId, taskId) => {
  try {
    const result = await API.post("task/invite/exist/", {
      userId,
      taskId,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Get User Data
export const getData = async (userId) => {
  console.log("-- getData --");

  console.log("-- going to backend --");
  let date1 = new Date();
  const response = await API.get(`user/${userId}/config/`);
  let date2 = new Date();
  console.log("-- finish backend --");
  console.log("-- To backend time-difference --", date2 - date1 + " ms");

  console.log("-- going to deserialization --");
  let date3 = new Date();
  const config = deserializeConfiguration(response.data);
  let date4 = new Date();
  console.log("-- finish deserialization --");
  console.log("-- To deserialization time-difference --", date4 - date3 + " ms");

  console.log("-- going to bmob for tasks --");
  let date5 = new Date();
  config.tasks = await getDataUrlFromBmobLink(config.tasks);
  let date6 = new Date();
  console.log("-- finish bmob for tasks --");
  console.log(" --Bmob for tasks time-difference --", date6 - date5 + " ms");

  console.log("-- going to bmob for cards --");
  let date7 = new Date();
  config.cards = await getDataUrlFromBmobLink(config.cards);
  let date8 = new Date();
  console.log("-- finish bmob for cards-- ");
  console.log("-- Bmob for cards time-difference --", date8 - date7 + " ms");

  console.log("-- user, tasks, cards, userTaskMap --", config.user, config.tasks, config.cards, config.userTaskMaps);

  return {
    user: config.user,
    tasks: config.tasks,
    cards: config.cards,
    userTaskMaps: config.userTaskMaps,
  };
};

// Will plan to remove this code and replace with
//
export const getDataUrlFromBmobLink = async (data) => {
  const imdData = data.map(async (datum) => {
    if (!datum.medias) return datum;
    const imdMedias = datum.medias.map(async (media) => {
      if (/www./.test(media.bmobUrl)) return;
      const result =
        window.location.protocol === "http:"
          ? await axios.get(media.bmobUrl.replace("https://", "http://")) // for exception cases
          : await axios.get(media.bmobUrl.replace("http://", "https://"));
      return { ...media, dataUrl: result.data };
    });
    return await Promise.all(imdMedias);
  });
  const finalData = await Promise.all(imdData);
  return finalData;
};

/**
 * a helper retrieve dataUrl for medias (BMob links)
 * @param {medias} an array of medias
 * @returns an array of medias with dataUrl
 * */
export const getMediasDataUrl = async (medias) => {
  if (!medias) return;
  const imdMedias = medias.map(async (media) => {
    if (/www./.test(media.bmobUrl)) return;
    const result =
      window.location.protocol === "http:"
        ? await axios.get(media.bmobUrl.replace("https://", "http://")) // for exception cases
        : await axios.get(media.bmobUrl.replace("http://", "https://"));
    return { ...media, dataUrl: result.data };
  });
  return await Promise.all(imdMedias);
};

// update username(nickname)
export const updateNickname = async (user) => {
  try {
    const result = await API.post("user/update/username/", {
      userId: user.userId,
      nickname: user.nickname,
    });
    return result;
  } catch (error) {
    return error.response;
  }
};

// DONE
export const uploadMedia = async (target, id, medias) => {
  console.log("in uploadMedia --", target, id, medias);
  const url = target === "task" ? "media/upload/task/" : "media/upload/card/";
  try {
    const result = await API.post(url, { id, medias });
    return result;
  } catch (error) {
    return error.response;
  }
};

// DONE
export const deleteMedia = async (target, id, keyId) => {
  console.log("in deleteMedia --", target, id, keyId);
  const url = target === "task" ? "media/delete/task/" : "media/delete/card/";
  try {
    const result = await API.post(url, { id, keyId });
    return result;
  } catch (error) {
    return error.response;
  }
};

export const addNewLineCharToString = (str) => {
  let newStr = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i] === "\n" || str[i] === "\r") {
      newStr += "\n";
    } else {
      newStr += str[i];
    }
  }
  return newStr;
};

// DONE
export const getUserLogoSrc = (headimgurl, letterLogo, userName) => {
  if (headimgurl) return headimgurl;
  if (letterLogo) return letterLogo;
  return getLetterLogo(userName ? userName : "USER", "hash", "");
};

// DONE
export const getLetterLogo = (_name, mode, bgColor) => {
  let drawing = document.createElement("canvas");

  drawing.setAttribute("width", "32px");
  drawing.setAttribute("height", "32px");

  if (drawing.getContext) {
    let context = drawing.getContext("2d");

    context.clearRect(0, 0, 32, 32);

    // draw the circle - the border
    context.beginPath();
    context.arc(16, 16, 15, 0, 2 * Math.PI, false);

    let color;
    if (mode === "hash") {
      // hash color
      let hash = 0;
      let name = _name;

      for (let i = 0; i < name.length; i++) {
        hash += name.charCodeAt(i);
      }

      color = COLORARRAY[hash % COLORARRAY.length];
    } else color = bgColor;

    // fill the circle
    context.fillStyle = color;
    context.fill();

    // draw the word
    context.font = "15px Sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.strokeStyle = "red";
    context.fillStyle = "#FFFFFF";
    context.fillText(_name[0], 16, 17, 33);

    // convert to img src
    const dataUrl = drawing.toDataURL();

    return dataUrl;
  }
};

// DONE
export const getFileLogo = (fileType) => {
  switch (fileType) {
    case "text/plain":
      return "fas fa-file-alt fa-2x logo";
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "fas fa-file-powerpoint fa-2x logo";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "fas fa-file-word fa-2x logo";
    case "application/pdf":
      return "fas fa-file-pdf fa-2x logo";
    default:
      return "fas fa-file fa-2x logo";
  }
};

// DONE
export const readFile = (file) => {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();

    // check if exceeds maximum
    if (file.size > 5000000) {
      reject(reader);
    }

    reader.onerror = function () {
      reject(reader);
    };

    reader.onload = function () {
      resolve({ file: file, dataUrl: reader.result });
    };

    reader.readAsDataURL(file);
  });
};

// DONE
export const readMedias = async ({ images, files }, otherInfo) => {
  let readers = [];

  if (!images && !files) return { result: "fail" };

  const combined = [];
  if (images) combined.push(images);
  if (files) combined.push(files);

  for (let i = 0; i < combined.length; i++) {
    readers.push(readFile(combined[i]));
  }

  const value = await Promise.all(readers);

  const final = value.map((v) => {
    return {
      name: v.file.name,
      type: v.file.type,
      size: v.file.size,
      dataUrl: v.dataUrl,
      ...otherInfo,
      keyId: v.file.type + "-" + Date.now().toString(),
      bmobUrl: "",
    };
  });

  console.log("-- read Medias final value --", final);

  return final;
};

// DONE
export const saveMedia = async (final, previous=null) => {
  console.log("saveMedia --", final);

  Bmob.initialize("ebb06190cfd037f6", "182585");

  // Login
  await Bmob.User.login("assembo", "AssemboFun777");

  let toUpload;

  for (let item of final) {
    toUpload = Bmob.File(item.name, item.dataUrl);
  }

  const bmobResults = await toUpload.save();

  console.log("-- bmobResults --", bmobResults);

  const newFinal = [];

  // save to backend
  if (bmobResults.length === 1) {
    const newF = { ...final[0] };
    newF.bmobUrl = bmobResults[0].url;
    newF.dataUrl = "";
    newFinal.push(newF);
  } else {
    // currently assume the maximum length is 2
    const firstBmobFileType = bmobResults[0].url.split(".").pop();
    const isImageFirstBmob =
      firstBmobFileType.toLowerCase() === "jpeg" ||
      firstBmobFileType.toLowerCase() === "jpg" ||
      firstBmobFileType.toLowerCase() === "png";
    const firstValueFileType = final[0].type;
    const isImageFirstValue = /image/.test(firstValueFileType);

    const string = isImageFirstBmob === isImageFirstValue ? "true" : "false";

    switch (string) {
      case "true":
        const newF0 = { ...final[0] };
        newF0.bmobUrl = bmobResults[0].url;
        newF0.dataUrl = "";
        newFinal.push(newF0);

        const newF1 = { ...final[1] };
        newF1.bmobUrl = bmobResults[1].url;
        newF1.dataUrl = "";
        newFinal.push(newF1);

        break;
      case "false":
        const newF00 = { ...final[0] };
        newF00.bmobUrl = bmobResults[1].url;
        newF00.dataUrl = "";
        newFinal.push(newF00);

        const newF11 = { ...final[1] };
        newF11.bmobUrl = bmobResults[0].url;
        newF11.dataUrl = "";
        newFinal.push(newF11);
        break;
      default:
        break;
    }
  }
  if (previous) {
    console.log("previous", previous);
    previous.forEach( (media) => {
      newFinal.push(media);
    });
  }
  console.log("-- check final saveMedia --", newFinal);
  const backendResult = await uploadMedia(newFinal[0].from, newFinal[0].id, newFinal);

  console.log("--backendResult --", backendResult);

  if (backendResult.status !== 200) return "fail";
  if (backendResult.data !== "updated medias successfully") return "fail";

  return { result: "success", data: newFinal };
};

// DONE
export const bmobDeleteMedia = async (bmobUrl) => {
  Bmob.initialize("ebb06190cfd037f6", "182585");
  await Bmob.User.login("assembo", "AssemboFun777");
  const del = Bmob.File();
  const val = [bmobUrl];
  await del.destroy(val);
};

/**
 * turn Date into time stampe based on date time and timezone offset
 */
export const getTimeStamp = (date) => {
  if (!date || !date instanceof Date) return null;
  return {
    time: date.getTime(),
    offset: date.getTimezoneOffset()
  }
};

/**
 * function to remove turn all object id in object to string
 * @param {Object} data data object
 */
export const removeObjectId = (data) => {
  if (!data) return null;
  if (data["$oid"]) return data["$oid"];
  for (let key in data) {
    if (data[key] instanceof Object) {
      data[key] = removeObjectId(data[key]);
    }
  }
  return data;
}
