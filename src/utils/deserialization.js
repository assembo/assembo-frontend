/**
 * Function to format BSON ObjectId into string
 * TBH I should just use toString() lol
 * @param {Object} oid ObjectId.
 * @return {String} ObjectId as string.
 */
const parseOid = (oid) => {
  return typeof oid === "string" ? oid : oid["$oid"];
};

/**
 * Function to format data from db.
 * @param {Object} metaData raw data.
 * @return {Object} Formatted data.
 */
export const deserializeConfiguration = (metaData) => {
  const serializedData = {};
  if (metaData.user) {
    serializedData.user = deserializeUser(metaData.user);
  }
  if (metaData.userTaskMaps) {
    const userTaskMaps = JSON.parse(metaData.userTaskMaps);
    serializedData.userTaskMaps = userTaskMaps;
  }
  if (metaData.tasks) {
    const tasks = deserializeTasks(metaData.tasks)
    serializedData.tasks = tasks;
  }
  if (metaData.cards) {
    const cards = deserializeCards(metaData.cards);
    serializedData.cards = cards;
  }
  return serializedData;
};

/**
 * Function to format raw user data from db.
 * @param {Object} metaData raw user data.
 * @return {Object} Formatted user data.
 */
export const deserializeUser = (metaData) => {
  const user = JSON.parse(metaData);
  user._id = parseOid(user._id);
  return user;
}

/**
 * Function to format raw users data from db.
 * @param {Object} metaData raw user sdata.
 * @return {Object} Formatted users data.
 */
 export const deserializeUsers = (metaData) => {
  const users = JSON.parse(metaData);
  users.forEach(
    (user) => {
      user._id = parseOid(user._id);
    }
  )
  return users;
}

/**
 * Function to format raw task data from db.
 * @param {Object} metaData raw task data.
 * @return {Object} Formatted task data.
 */
 export const deserializeTasks = (metaData) => {
  const tasks = JSON.parse(metaData);
  tasks.map((task) => {
    task._id = parseOid(task._id);
    task.creator = parseOid(task.creator);
    if (!task.updatedBy) {
      task.updatedBy = task.creator;
    } else {
      task.updatedBy = parseOid(task.updatedBy);
    }
    if (task.owner) {
      task.owner = parseOid(task.owner);
    }
    if (task.cardIds) {
      task.cardIds = task.cardIds.map((id) => {
        return parseOid(id);
      });
    }
    // if (!task.updateUserName && serializedData.userTaskMaps) {
    //   const relevantTaskMap = serializedData.userTaskMaps.find((userTaskMap) => {
    //     return userTaskMap.taskId === task._id && userTaskMap.userId === task.updatedBy;
    //   });
    //   if (relevantTaskMap && relevantTaskMap.userName) {
    //     task.updateUserName = relevantTaskMap.userName;
    //   } else {
    //     task.updateUserName = "AssemboTeam";
    //   }
    // }
    return task;
  });
  return tasks;
};

/**
 * Function to format raw card data from db.
 * @param {Object} metaData raw card data.
 * @return {Object} Formatted card data.
 */
export const deserializeCards = (metaData) => {
  const cards = [];
  const cardData = JSON.parse(metaData);
  cardData.forEach((card) => {
    card._id = parseOid(card._id);
    card.createdBy = parseOid(card.createdBy);
    card.updatedBy = parseOid(card.updatedBy);
    if (card.taskId) {
      card.taskId = parseOid(card.taskId);
    }
    if (card.owner) {
      card.owner = parseOid(card.owner);
    }
    cards.push(card);
  });
  return cards;
}