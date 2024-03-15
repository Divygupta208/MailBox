import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UI",
  initialState: {
    showCompose: false,
  },
  reducers: {
    setShowCompose: (state, action) => {
      state.showCompose = !state.showCompose;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
