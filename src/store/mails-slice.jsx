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
export const fetchSpamMails = (decodedMail) => async (dispatch) => {
  const response = await fetch(
    `https://mailbox-e16e0-default-rtdb.firebaseio.com/spamEmails/${decodedMail}.json`
  );

  if (response.ok) {
    const data = await response.json();

    const spamMailsArray = Object.keys(data).map((key) => ({
      spamid: key,
      ...data[key],
    }));

    dispatch(mailAction.setSpammedMails(spamMailsArray));
  }
};

export const moveMailToSpam =
  (decodedMail, id) => async (dispatch, getState) => {
    try {
      const state = getState();
      const mail = state.mails.receivedMails.find((mail) => mail.id === id);

      dispatch(mailSlice.actions.removeReceivedMail(id));

      await fetch(
        `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}/${id}.json`,
        {
          method: "DELETE",
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 5));

      const updatedState = getState();
      dispatch(
        mailSlice.actions.setReceivedMails(updatedState.mails.receivedMails)
      );

      const totalUnread = updatedState.mails.receivedMails.reduce(
        (count, email) => {
          if (!email.read) {
            return count + 1;
          } else {
            return count;
          }
        },
        0
      );

      console.log(totalUnread);

      dispatch(mailSlice.actions.setUnread(totalUnread));

      // dispatch(mailSlice.actions.addSpammedMail(mail));

      if (mail) {
        await fetch(
          `https://mailbox-e16e0-default-rtdb.firebaseio.com/spamEmails/${decodedMail}.json`,
          {
            method: "POST",
            body: JSON.stringify(mail),
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        console.error("Mail not found with ID:", id);
      }
    } catch (error) {
      console.error("Error moving mail to spam:", error);
    }
  };

const mailSlice = createSlice({
  name: "Mails",
  initialState: {
    sentMails: [],
    receivedMails: [],
    spamMails: [],
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

    setSpammedMails: (state, action) => {
      state.spamMails = action.payload;
    },

    removeReceivedMail: (state, action) => {
      state.receivedMails = state.receivedMails.filter(
        (mail) => mail.id !== action.payload
      );
    },

    addSpammedMail(state, action) {
      state.spamMails.push(action.payload);
    },
  },
});

export const mailAction = {
  ...mailSlice.actions,
  moveMailToSpam,
  fetchReceivedMails,
  fetchSentMails,
  fetchSpamMails,
};

export default mailSlice;
