import { createSlice } from "@reduxjs/toolkit";

export const userTaskMapsSlice = createSlice({
  name: "userTaskMaps",
  initialState: {
    value: [],
  },
  reducers: {
    setAllUserTaskMaps: (state, action) => {
      // STILL NEED MODIFY
      state.value = action.payload;
    },
    deleteAllUserTaskMaps: (state) => {
      state.value = {};
    },
    createUserTaskMap: (state, action) => {
      // STILL NEED MODIFY
      state.value.push(action.payload);
    },
    updateUserTaskMap: (state, action) => {
      // STILL NEED MODIFY
      state.value = state.value.map((userTaskMap) =>
        userTaskMap._id === action.payload._id ? action.payload : userTaskMap
      );
    },
    deleteUserTaskMap: (state, action) => {
      // STILL NEED MODIFY
      state.value = state.value.filter((userTaskMap) => userTaskMap._id !== action.payload);
    },
    updateUserName: (state, action) => {
      state.value = state.value.map((userTaskMap) => {
        if (userTaskMap.userId === action.payload.userId) {
          const newUserTaskMap = userTaskMap;
          newUserTaskMap.userName = action.payload.newName;
          return newUserTaskMap;
        } else return userTaskMap;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAllUserTaskMaps,
  deleteAllUserTaskMaps,
  createUserTaskMap,
  updateUserTaskMap,
  deleteUserTaskMap,
  updateUserName,
} = userTaskMapsSlice.actions;

export default userTaskMapsSlice.reducer;
