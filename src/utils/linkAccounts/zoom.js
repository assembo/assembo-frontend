import API from "../../api/axios";
/**
 * function to create a zoom meeting
 * @param {Object} data that meeting data
 * @returns 
 */
 export const linkZoomAccount = async (data) => {
    if (!data) {
      return;
    }
    try {
      const url = "user/link/zoom/";
      const result = await API.post(url, data);
      const userData = result.data;
      return userData.user;
    } catch (error) {
      console.error(`unable to create zoom meeting ${error}`);
    }
  };