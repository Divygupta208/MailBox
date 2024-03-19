import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdSendTimeExtension, MdStar, MdStarBorder } from "react-icons/md";
import { Outlet, useNavigate, useParams } from "react-router-dom";
const ReceivedMailList = ({
  id,
  sentBy,
  starred,
  subject,
  body,
  read,
  timestamp,
  readMessageHandler,
  toggleStarredMessage,
}) => {
  const date = new Date(timestamp);

  const [messageRead, setMessageRead] = useState(read);

  const [messageStarred, setMessageStarred] = useState(starred);
  const userMail = useParams();
  const decodedMail = userMail.id.replace("@", "%40").replace(".", "%25");
  const navigate = useNavigate();

  const handleMailClick = (
    id,
    sentBy,
    subject,
    body,
    timestamp,
    messageStarred
  ) => {
    navigate("readmail", {
      state: {
        email: {
          id: id,
          sentBy: sentBy,
          starred: messageStarred,
          subject: subject,
          body: body,
          read: messageRead,
          timestamp: timestamp,
        },
      },
    });
  };

  const readMessage = async () => {
    setMessageRead(true);
    handleMailClick(id, sentBy, subject, body, timestamp, messageStarred);
    readMessageHandler(
      id,
      sentBy,
      starred,
      subject,
      body,
      timestamp,
      messageRead
    );
  };

  //toggle starred

  const toggleStarred = async (e) => {
    e.stopPropagation();
    const newStarredStatus = !messageStarred; // Toggle the starred status
    setMessageStarred(newStarredStatus); // Update the local state

    toggleStarredMessage(
      id,
      sentBy,
      newStarredStatus,
      subject,
      body,
      read,
      timestamp
    );
  };

  return (
    <>
      <motion.div
        className="rounded-lg shadow-lg border-2 border-gray-200/40 p-2 flex flex-col w-[80vw] relative "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={readMessage}
      >
        <div className="flex items-center mb-4">
          <div className="relative">
            <input type="checkbox" className="mr-6" />
            {!messageRead && (
              <span class="absolute top-1.5 right-1 w-3.5 h-3.5 bg-red-400 border-2 border-orange-200 dark:border-gray-800 rounded-full"></span>
            )}
          </div>
          <span className="font-bold mr-4">{sentBy}</span>
          {messageStarred ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={toggleStarred}
              className="text-yellow-500 mr-4"
            >
              <MdStar />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={toggleStarred}
              className="text-yellow-500 mr-4"
            >
              <MdStarBorder />
            </motion.button>
          )}
          <div className="flex">
            <span className="flex-grow">
              <i>{subject}</i>
            </span>
            <span className="ml-5">|</span>
            <div className="text-md text-center ml-4">{body}</div>
          </div>

          <span className="text-sm text-gray-500 ml-auto">
            {date.toLocaleTimeString()}
            {date.toLocaleDateString()}
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default ReceivedMailList;
