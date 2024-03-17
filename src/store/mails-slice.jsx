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
    updateReceivedMail(state, action) {
      const updatedMail = action.payload;
      const index = state.receivedMails.findIndex(
        (mail) => mail.id === updatedMail.id
      );
      if (index !== -1) {
        state.receivedMails[index] = updatedMail;
      }
    },
  },
});

export const mailAction = mailSlice.actions;

export default mailSlice;
