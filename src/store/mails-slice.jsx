import { createSlice } from "@reduxjs/toolkit";

export const fetchReceivedMails = (decodedMail) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}.json`
    );

    if (response.ok) {
      const data = await response.json();

      const receivedMailArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      dispatch(mailSlice.actions.setReceivedMails(receivedMailArray));

      const totalUnread = receivedMailArray.reduce((count, email) => {
        if (!email.read) {
          return count + 1;
        } else {
          return count;
        }
      }, 0);

      dispatch(mailSlice.actions.setUnread(totalUnread));
    }
  } catch (error) {
    console.error("Error fetching mails:", error);
  }
};

export const fetchSentMails = (decodedMail) => async (dispatch) => {
  const response = await fetch(
    `https://mailbox-e16e0-default-rtdb.firebaseio.com/sentEmails/${decodedMail}.json`
  );

  if (response.ok) {
    const data = await response.json();
    console.log(data);

    const sentMailsArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    dispatch(mailAction.setSentMails(sentMailsArray));
  }
};

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

export const mailAction = {
  ...mailSlice.actions,
  fetchReceivedMails,
  fetchSentMails,
};

export default mailSlice;
