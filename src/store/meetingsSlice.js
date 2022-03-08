import { createSlice } from "@reduxjs/toolkit";

export const meetingsSlice = createSlice({
  name: "meetings",
  initialState: {
    value: [],
  },
  reducers: {
    setAllMeetings: (state, action) => {
      state.value = action.payload;
    },
    deleteAllMeetings: (state) => {
      state.value = [];
    },
    createMeeting: (state, action) => {
      state.value.push(action.payload);
    }
  },
});

export const {
  setAllMeetings,
  deleteAllMeetings,
  createMeeting,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
