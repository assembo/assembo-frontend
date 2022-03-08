import API from "../../api/axios";
/**
 * function to add transcripts to a meeting
 * @param {Object} data the transcript data
 * @returns 
 */
 export const addTranscript = async (data) => {
    if (!data) {
      return;
    }
    try {
      const url = "transcript/add/";
      const result = await API.post(url, data);
      const userData = result.data;
      return userData.result;
    } catch (error) {
      console.error(`unable to create zoom meeting ${error}`);
    }
  };

/**
 * function to get transcripts for a meeting
 * @param {string} meeting id
 * @returns 
 */
 export const getMeetingTranscripts = async (meetingId, transcriptId) => {
    if (!meetingId) {
      return;
    }
    try {
      const url = `meeting/${meetingId}/transcript/${transcriptId}/get/`;
      const result = await API.get(url);
      const rawData = result.data;
      return rawData.transcripts;
    } catch (error) {
      console.error(`unable to create zoom meeting ${error}`);
    }
  };