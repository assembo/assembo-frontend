import { createSlice } from "@reduxjs/toolkit";

export const meetingCenterSlice = createSlice({
  name: "meetingCenter",
  initialState: {
    value: {
      selectedMeeting: null,
      openLinkUserModal: false,
      mapView: true,
      recording: false
    },
  },
  reducers: {
    setSelectedMeeting: (state, action) => {
      state.value.selectedMeeting = action.payload;
    },
    setOpenLinkUserModal: (state, action) => {
      state.value.openLinkUserModal = action.payload;
    },
    setRecording: (state, action) => {
      state.value.recording = action.payload;
    }
  },
});

export const {
  setSelectedMeeting,
  setOpenLinkUserModal,
  setRecording
} = meetingCenterSlice.actions;

export default meetingCenterSlice.reducer;
