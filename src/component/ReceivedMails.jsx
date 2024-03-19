import React, { useEffect, useState } from "react";
import ReceivedMailList from "./ReceivedMailList";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../store/mails-slice";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReadMessage from "./ReadMessage";

const ReceivedMails = () => {
  const dispatch = useDispatch();
  const userMail = useParams();
  const navigate = useNavigate();
  const totalUnread = useSelector((state) => state.mails.totalUnread);
  const [starred, setStarred] = useState();
  const receivedMails = useSelector((state) => state.mails.receivedMails);
  const decodedMail = userMail.id.replace("@", "%40").replace(".", "%25");

  useEffect(() => {
    const fetchReceivedMails = async () => {
      const response = await fetch(
        `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}.json`
      );

      if (response.ok) {
        const data = await response.json();

        const receivedMailArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        dispatch(mailAction.setReceivedMails(receivedMailArray));

        const totalUnread = receivedMailArray.reduce((count, email) => {
          if (!email.read) {
            return count + 1;
          } else {
            return count;
          }
        }, 0);

        dispatch(mailAction.setUnread(totalUnread));
      }
    };

    fetchReceivedMails();
  }, []);

  const readMessageHandler = async (
    id,
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

    await new Promise((resolve) => setTimeout(resolve, 5));

    const response = await fetch(
      `https://mailbox-e16e0-default-rtdb.firebaseio.com/receivedEmails/${decodedMail}/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
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

  return (
    <div className="mt-[-100vh] ml-36 w-full h-10vh text-black p-11">
      <ul>
        {receivedMails.map((mail) => (
          <motion.li
            key={mail.id}
            whileHover={{ scale: 1.02, cursor: "pointer" }}
          >
            <ReceivedMailList
              id={mail.id}
              sentBy={mail.senderMail}
              subject={mail.subject}
              starred={mail.starred}
              read={mail.read}
              body={mail.body.replace(/(<([^>]+)>)/gi, "")}
              timestamp={mail.timestamp}
              readMessageHandler={readMessageHandler}
              toggleStarredMessage={toggleStarredMessage}
            />
          </motion.li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default ReceivedMails;
