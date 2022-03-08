import API from "../../api/axios";

/**
 * function to retrieve meeting agenda based on meeting id
 * @param {String} agendaMapId id of the agenda map
 * @returns list of meetings
 */
 export const getAgendMap = async (agendaMapId) => {
  if (!agendaMapId) {
    return;
  }
  try {
    const url = `agendaMap/${agendaMapId}/get/`;
    const result = await API.get(url);
    const rawData = result.data;
    const agendaMap = rawData.agendaMap;
    return agendaMap;
  } catch (error) {
    console.error(`unable to retrieve agenda map ${agendaMapId} due to ${error}`);
  }
};

/**
 * function to toggle on the next topic node on inside of the agenda map, to note 
 * topic nodes in agenda map form a cycle, when the last node is reached, the first node
 * will be toggled on
 * @param {String} agendaMapId id of the agenda map
 * @return new content of meeting
 */
export const toggleTopicNodeStatus = async (agendaMapId) => {
  if (!agendaMapId) return;
  try {
    const url = `agendaMap/${agendaMapId}/toggle/`;
    const result = await API.post(url);
    const rawData = result.data;
    const agendaMap = rawData.agendaMap;
    return agendaMap;
  } catch (error) {
    console.error(`unable to toggle topic node in agenda map ${agendaMapId} due to ${error}`)
  }
};

/**
 * function to add a text node into the currently active node in the mind map
 * @param {String} agendaMapId id of the agenda map
 * @param {String} transcriptText content of the transcript
 * @return new content of meeting
 */
export const addTextNode = async (agendaMapId, transcriptText) => {
  if (!agendaMapId && !transcriptText) return;
  try {
    const url = `agendaMap/${agendaMapId}/add`;
    const result = await API.post(url, { 
      transcriptText
    });
    const rawData = result.data;
    const agendaMap = rawData.agendaMap;
    return agendaMap;
  } catch (error) {
    console.error(`unable to toggle topic node in agenda map ${agendaMapId} due to ${error}`)
  }
};