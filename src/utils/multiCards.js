import API from "../api/axios";

/**
 * function to delete an array of cards
 * @param {Object} data that contains card ids and task to delete cards from
 * @returns 
 */
export const deleteCards = async (data) => {
  if (!data) {
    return;
  }
  try {
    const url = "cards/delete/";
    await API.post(url, data);
    return;
  } catch (error) {
    console.error(`unable to delete cards ${error}`);
  }
};

/**
 * funciton to change the card group of an array of cards
 * @param {Object} data that contains card ids and task to delete cards from
 * @returns 
 */
 export const changeCardsTask = async (data) => {
  if (!data) {
    return;
  }
  try {
    const url = "cards/change_task/";
    await API.post(url, data);
    return;
  } catch (error) {
    console.error(`unable change task of cards ${error}`);
  }
};