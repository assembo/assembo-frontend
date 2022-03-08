import API from "../api/axios";

/**
 * get the file logo according to its type
 * @param {string} mediaType
 *    text / pdf / word / ppt
 * */
export const getMediaLogo = (mediaType) => {
  switch (mediaType) {
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

/**
 * read the media
 * @param {string} media
 * */
export const readMedia = (media) => {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();

    // check if exceeds maximum
    if (media.size > 5000000) {
      reject(reader);
    }

    reader.onerror = function () {
      reject(reader);
    };

    reader.onload = function () {
      resolve({ media: media, dataUrl: reader.result });
    };

    reader.readAsDataURL(media);
  });
};

/**
 * update the medias with their bmoburl
 * @param {[object]} medias
 *    new medias to add
 * @param {object} otherInfo
 *    including the from, date, targetId, owner etc.
 * @returns {[object]} array of medias object which includes their dataUrl
 * */
export const updateMediasDataUrl = async (medias, otherInfo) => {
  let readers = [];

  for (let i = 0; i < medias.length; i++) {
    readers.push(readMedia(medias[i]));
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

  return final;
};

/**
 * update the medias with their bmoburl
 * @param {[object]} final
 * @param {[object]} bmobResults
 * @returns {[object]} array of medias objects that incluldes their bmobUrl as well
 * */
export const updateMediasBmobUrl = async (final, bmobResults) => {
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

  return newFinal;
};

/**
 * update the media from the backend
 * @param {string} target
 *      either to task / card
 * @param {string} id
 *      the task / card id
 * @param {[object]} array_of_media_objects
 * */
export const updateMediaFromBackend = async (target, id, medias) => {
  try {
    const result = await API.post("media/update/", { target, id, medias });
    return result;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
/**
 * get the medias from task cand cards in an array format
 * @param {Object} task object
 * @param {Array} cards an array of card objects
 * @param {[object]} array_of_media_objects
 * */
export const getCombinedMedias = (task, cards) => {
  const taskMedias = task.medias;
  const combined = [];
  if (taskMedias) {
    combined.push(...task.medias);
  }
  cards.filter((card) => (card ? card.medias : card)).map((card) => combined.push(...card.medias));
  return combined;
};
