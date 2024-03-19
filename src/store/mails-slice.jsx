import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
  name: "Mails",
  initialState: {
    sentMails: [],
    receivedMails: [],
    totalUnread: 0,
  },
  reducers: {
    setSentMails: (state, action) => {
      state.sentMails = action.payload;
    },
    setReceivedMails: (state, action) => {
      state.receivedMails = action.payload;
    },
    updateReceivedMail(state, action) {
      const updatedMail = action.payload;
      const index = state.receivedMails.findIndex(
        (mail) => mail.id === updatedMail.id
      );
      if (index !== -1) {
        state.receivedMails[index] = updatedMail;
      }
    },

    setUnread: (state, action) => {
      state.totalUnread = action.payload;
    },
  },
});

export const mailAction = mailSlice.actions;

export default mailSlice;
