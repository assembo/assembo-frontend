import API from "../api/axios";

/**
 * add the invite task to the user
 * @param {string} userId
 * @param {string} taskId
 * @returns {data: {taskId: string})} if the task already exist
 * @returns {data: {task: object, cards: [object], userTaskMaps: [object]}} if the task not exist
 *    task: the invited task
 *    cards: the cards of the task
 *    userTaskMaps: the userTaskMaps including all the users of the task
 * */
export const inviteAccept = async (userId, taskId) => {
  try {
    const result = await API.post("invite/accept/", {
      userId,
      taskId,
    });
    return result;
  } catch (error) {
    console.error(error);
    return error.response;
  }
};
