import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      //action.payload = user {_id, [...user_data]}
      state.value = action.payload;
    },
    deleteUser: (state) => {
      state.value = {};
    },
    updateUserName: (state, action) => {
      //action.payload = userName
      state.value.userName = action.payload;
    },
    updateUserLogo: (state, action) => {
      //action.payload = userLogo (Url)
      state.value.userLogo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, deleteUser, updateUserName, updateUserLogo } = userSlice.actions;

export default userSlice.reducer;
