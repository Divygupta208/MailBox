import React, { useEffect, useState } from "react";
import ReceivedMailList from "./ReceivedMailList";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../store/mails-slice";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReadMessage from "./ReadMessage";
import { ToastContainer } from "react-toastify";

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

  const fetchReceivedMailsInterval = () => {
    dispatch(mailAction.fetchReceivedMails(decodedMail));
  };

  useEffect(() => {
    fetchReceivedMailsInterval();

    // const id = setInterval(fetchReceivedMailsInterval, 2000);
    // setIntervalId(id);

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
    timestamp,
    messageRead
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
          timestamp: timestamp,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();

    dispatch(mailAction.setUnread(totalUnread));
  };

  const toggleStarredMessage = async (
    id,
    sendername,
    sentBy,
    newStarredStatus,
    subject,
    body,
    read,
    timestamp
  ) => {
    const updatedReceivedMails = receivedMails.map((mail) =>
      mail.id === id ? { ...mail, starred: newStarredStatus } : mail
    );

    dispatch(mailAction.setReceivedMails(updatedReceivedMails));

    const response = await fetch(
      `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          sendername: sendername,
          senderMail: sentBy,
          starred: newStarredStatus,
          subject: subject,
          body: body,
          read: read,
          timestamp: timestamp,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
  };

  const deleteMailHandler = async (id) => {
    try {
      await fetch(
        `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}/${id}.json`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 0));

      const receivedMailsNew = receivedMails.filter((mail) => mail.id !== id);

      const totalUnread = receivedMailsNew.reduce((count, email) => {
        if (!email.read) {
          return count + 1;
        } else {
          return count;
        }
      }, 0);

      dispatch(mailAction.setReceivedMails(receivedMailsNew));
      dispatch(mailAction.setUnread(totalUnread));

      notify("Mail Deleted Successfully");
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mt-[-100vh] ml-16 w-[100vw] h-[100vh] text-black p-10 px-20 bg-gradient-to-br from-violet-100 to-gray-800 -z-30">
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
                body={mail.body.replace(/(<([^>]+)>)/gi, "")}
                timestamp={mail.timestamp}
                readMessageHandler={readMessageHandler}
                toggleStarredMessage={toggleStarredMessage}
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
