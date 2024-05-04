import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UI",
  initialState: {
    showCompose: false,
    showProfile: false,
  },
  reducers: {
    setShowCompose: (state, action) => {
      state.showCompose = !state.showCompose;
    },

    setShowProfile: (state, action) => {
      state.showProfile = !state.showProfile;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
