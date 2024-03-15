import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "Mails",
  initialState: {
    sentMails: [],
    receivedMails: [],
  },
  reducers: {
    setSentMails: (state, action) => {
      state.sentMails = action.payload;
    },
    setReceivedMails: (state, action) => {
      state.receivedMails = action.payload;
    },
  },
});

export const mailAction = mailSlice.actions;

export default mailSlice;
