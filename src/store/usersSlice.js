import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    value: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.value = action.payload;
    },
    deleteAllUsers: (state) => {
      state.value = [];
    },
    createUser: (state, action) => {
      state.value.push(action.payload);
    },
    updateUser: (state, action) => {
      state.value = state.value.map((user) => {
        return user._id === action.payload._id ? action.payload : user;
      });
    },
    batchUpdateUsers: (state, action) => {
      state.value = action.payload.map((user) => {
        const newUser = state.value.find( (item) => {
          return item._id === user._id;
        });
        return newUser ? newUser : user;
      });
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user._id !== action.payload);
    },
  },
});

export const {
  setAllUsers,
  deleteAllUsers,
  createUser,
  updateUser,
  batchUpdateUsers,
  deleteUser
} = usersSlice.actions;

export default usersSlice.reducer;
