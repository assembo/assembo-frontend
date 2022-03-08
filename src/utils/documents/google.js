import API from "../../api/axios";

/**
 * function to retrieve zoom meetings based on user id
 * @param {string} zoomUserId to retireve meetings
 * @returns list of meetings
 */
 export const getMeetingDoc = async (zoomId) => {
  if (!zoomId) {
    return;
  }
  try {
    const url = `document/zoom/${zoomId}/get/`;
    const result = await API.get(url);
    const rawData = result.data;
    return rawData;
  } catch (error) {
    console.error(`unable to retrieve document Id for meeting ${zoomId} ${error}`);
  }
};

/**
 * function to modify agenda tree
 * @param {Object} agendaData containing meta data to modify google doc
 * @returns doc id modified
 */
 export const modifyAgendaTree = async (agendaData) => {
  if (!agendaData) {
    return;
  }
  try {
    const url = `agenda/modify/`;
    const result = await API.post(url, agendaData);
    const rawData = result.data;
    return rawData;
  } catch (error) {
    console.error(`unable to retrieve document Id for meeting ${agendaData.docId} ${error}`);
  }
};

/**
 * function to insert text into agenda tree
 * @param {Object} text data containing meta data to be inserted into google doc based on node text
 * @returns doc id modified
 */
 export const insertTextIntoAgendaTree = async (textData) => {
  if (!textData) {
    return;
  }
  try {
    const url = `agenda/insert/`;
    const result = await API.post(url, textData);
    const rawData = result.data;
    return rawData;
  } catch (error) {
    console.error(`unable to retrieve document Id for meeting ${textData.docId} ${error}`);
  }
};

/**
 * function for user to insert text into agenda tree
 * @param {Object} text data containing meta data to be inserted into google doc based on node text
 * @returns doc id modified
 */
 export const userInsertTextIntoAgendaTree = async (textData) => {
  if (!textData) {
    return;
  }
  try {
    const url = `agenda/userinsert/`;
    const result = await API.post(url, textData);
    const rawData = result.data;
    return rawData;
  } catch (error) {
    console.error(`unable to retrieve document Id for meeting ${textData.docId} ${error}`);
  }
};