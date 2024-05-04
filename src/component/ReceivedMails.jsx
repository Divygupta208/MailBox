import React, { useEffect, useState } from "react";
import ReceivedMailList from "./ReceivedMailList";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../store/mails-slice";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReadMessage from "./ReadMessage";
import { ToastContainer, toast } from "react-toastify";
import { useMailFetching } from "../hooks/useMailFetching";

const ReceivedMails = () => {
  const dispatch = useDispatch();
  const userMail = useParams();
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const totalUnread = useSelector((state) => state.mails.totalUnread);
  const [intervalId, setIntervalId] = useState(null);
  const [starred, setStarred] = useState();
  const receivedMails = useSelector((state) => state.mails.receivedMails);
  const decodedMail = userMail.id.replace("@", "%40").replace(".", "%25");

  // useMailFetching(
  //   "https://mailbox-e16e0-default-rtdb.firebaseio.com",
  //   decodedMail,
  //   "received"
  // );

  //{method using action creator thunk}
  const fetchReceivedMailsInterval = () => {
    dispatch(mailAction.fetchReceivedMails(decodedMail));
  };

  useEffect(() => {
    fetchReceivedMailsInterval();

    const id = setInterval(fetchReceivedMailsInterval, 2000);
    setIntervalId(id);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, userMail.id]);

  const readMessageHandler = async (
    id,
    sendername,
    sentBy,
    starred,
    subject,
    body,
    spam,
    timestamp
  ) => {
    const updatedReceivedMails = receivedMails.map((mail) =>
      mail.id === id ? { ...mail, read: true } : mail
    );

    dispatch(mailAction.setReceivedMails(updatedReceivedMails));

    await new Promise((resolve) => setTimeout(resolve, 50));

    const totalUnread = updatedReceivedMails.reduce((count, email) => {
      if (!email.read) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

    const response = await fetch(
      `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          sendername: sendername,
          senderMail: sentBy,
          starred: starred,
          subject: subject,
          body: body,
          read: true,
          spam: spam,
          timestamp: timestamp,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    dispatch(mailAction.setUnread(totalUnread));
  };

  // const toggleStarredMessage = async (
  //   id,
  //   sendername,
  //   sentBy,
  //   newStarredStatus,
  //   subject,
  //   body,
  //   spam,
  //   read,
  //   timestamp
  // ) => {
  //   const updatedReceivedMails = receivedMails.map((mail) =>
  //     mail.id === id ? { ...mail, starred: newStarredStatus } : mail
  //   );

  //   dispatch(mailAction.setReceivedMails(updatedReceivedMails));

  //   const response = await fetch(
  //     `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}/${id}.json`,
  //     {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         sendername: sendername,
  //         senderMail: sentBy,
  //         starred: newStarredStatus,
  //         spam: spam,
  //         subject: subject,
  //         body: body,
  //         read: read,
  //         timestamp: timestamp,
  //       }),
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  //   const data = await response.json();
  // };

  // const toggleSpamMessage = async (
  //   id,
  //   sendername,
  //   sentBy,
  //   starred,
  //   subject,
  //   body,
  //   read,
  //   spamStatus,
  //   timestamp
  // ) => {
  //   const updatedReceivedMails = receivedMails.map((mail) =>
  //     mail.id === id ? { ...mail, spam: spamStatus } : mail
  //   );

  //   dispatch(mailAction.setReceivedMails(updatedReceivedMails));

  //   const response = await fetch(
  //     `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}/${id}.json`,
  //     {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         sendername: sendername,
  //         senderMail: sentBy,
  //         starred: starred,
  //         subject: subject,
  //         body: body,
  //         read: read,
  //         spam: spamStatus,
  //         timestamp: timestamp,
  //       }),
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  //   const data = await response.json();
  // };

  const deleteMailHandler = async (id) => {
    const receivedMailsNew = receivedMails.filter((mail) => mail.id !== id);
    const totalUnread = receivedMailsNew.reduce((count, email) => {
      if (!email.read) {
        return count + 1;
      } else {
        return count;
      }
    }, 0);

    try {
      await fetch(
        `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}/${id}.json`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 5));
      dispatch(mailAction.setUnread(totalUnread));
      dispatch(mailAction.setReceivedMails(receivedMailsNew));
      notify("Mail Deleted Successfully");
    } catch (error) {
      notify("Error deleting mail");
    }
  };

  return (
    <>
      <div className="mt-[-100vh] ml-16 w-[100vw] h-[100vh] text-black p-10 px-20 bg-gradient-to-b from-white to-purple-200 ">
        <ul>
          {receivedMails.map((mail) => (
            <motion.li
              className="mt-2"
              key={mail.id}
              whileHover={{ scale: 1.02, cursor: "pointer" }}
            >
              <ReceivedMailList
                id={mail.id}
                sendername={mail.sendername}
                sentBy={mail.senderMail}
                subject={mail.subject}
                starred={mail.starred}
                read={mail.read}
                spam={mail.spam}
                body={mail.body.replace(/(<([^>]+)>)/gi, "")}
                timestamp={mail.timestamp}
                readMessageHandler={readMessageHandler}
                deleteMailHandler={deleteMailHandler}
              />
              <hr className="mt-1"></hr>
            </motion.li>
          ))}
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default ReceivedMails;
