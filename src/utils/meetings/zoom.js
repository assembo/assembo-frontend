import API from "../../api/axios";
import { apiKey } from "../../zoomAPISecretes";
import { removeObjectId } from "../helpers";
const crypto = require('crypto') // crypto comes with Node.js

/**
 * function to retrieve zoom meeting based on meeting id
 * @param {string} zoomUserId to retireve meetings
 * @returns list of meetings
 */
 export const getZoomMeeting = async (meetingId) => {
  if (!meetingId) {
    return;
  }
  try {
    const url = `meeting/zoom/${meetingId}/`;
    const result = await API.get(url);
    const rawData = result.data;
    const meeting = rawData.meeting;
    return meeting;
  } catch (error) {
    console.error(`unable to create zoom meeting ${error}`);
  }
};


/**
 * function to retrieve zoom meetings based on user id
 * @param {string} zoomUserId to retireve meetings
 * @returns list of meetings
 */
 export const getZoomMeetings = async (zoomUserId) => {
  if (!zoomUserId) {
    return;
  }
  try {
    const url = `meeting/zoom/${zoomUserId}/get/`;
    const result = await API.get(url);
    const rawData = result.data;
    const meetingData = rawData.meetings;
    const meetings = meetingData.meetings;
    return meetings;
  } catch (error) {
    console.error(`unable to create zoom meeting ${error}`);
  }
};

/**
 * function to create a zoom meeting
 * @param {Object} data that meeting data
 * @returns 
 */
export const createZoomMeeting = async (data) => {
  if (!data) {
    return;
  }
  try {
    const url = "meeting/zoom/create/";
    const result = await API.post(url, data);
    const meetingData = result.data;
    return meetingData.meeting;
  } catch (error) {
    console.error(`unable to create zoom meeting ${error}`);
  }
};

/**
 * function to generate zoom signature based 
 */
 export const generateSignature = ({role, apiSecret, meetingNumber}) => {
  // Prevent time sync issue between client signature generation and zoom 
  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');

  return signature
};

/**
 * function to get meeting doc from database
 * @param {*} meetingId 
 */
export const getMeetingData = async (meetingId) => {
  if (!meetingId) {
    return;
  }
  try {
    const url = `meeting/zoom/${meetingId}/get_data`;
    const result = await API.get(url);
    const rawData = result.data;
    const rawMeetingData = rawData.meeting;
    const data = JSON.parse(rawMeetingData);
    const meetingData = removeObjectId(data);
    return meetingData;
  } catch (error) {
    console.error(`unable to create zoom meeting ${error}`);
  }
}