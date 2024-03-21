import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MdSendTimeExtension,
  MdStar,
  MdStarBorder,
  MdMoreVert,
} from "react-icons/md";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { AiOutlineDelete, AiOutlineFlag, AiOutlineCheck } from "react-icons/ai";
const ReceivedMailList = ({
  id,
  sendername,
  sentBy,
  starred,
  subject,
  body,
  read,
  timestamp,
  readMessageHandler,
  toggleStarredMessage,
  deleteMailHandler,
}) => {
  const date = new Date(timestamp);

  const [messageRead, setMessageRead] = useState(read);
  const [showOptions, setShowOptions] = useState(false);
  const [messageStarred, setMessageStarred] = useState(starred);
  const userMail = useParams();
  const decodedMail = userMail.id.replace("@", "%40").replace(".", "%25");
  const navigate = useNavigate();

  const toggleOptions = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteMailHandler(id);
  };

  const handleSpam = () => {
    // Handle spam action
  };

  const handleMark = () => {
    // Handle mark action
  };

  const handleMailClick = (
    id,
    sendername,
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
          sendername: sendername,
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
    handleMailClick(
      id,
      sendername,
      sentBy,
      subject,
      body,
      timestamp,
      messageStarred
    );
    readMessageHandler(
      id,
      sendername,
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
    const newStarredStatus = !messageStarred;
    setMessageStarred(newStarredStatus);

    toggleStarredMessage(
      id,
      sendername,
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
        className="rounded-lg shadow-lg border-2 border-gray-200/40 p-2 flex flex-col w-[80vw] relative -z-5 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onClick={readMessage}
      >
        <div className="flex items-center mb-4">
          <div className="relative">
            <input type="checkbox" className="mr-6" />
            {!messageRead && (
              <span className="absolute top-1.5 right-1 w-3.5 h-3.5 bg-red-400 border-2 border-orange-200 dark:border-gray-800 rounded-full"></span>
            )}
          </div>
          <div className="flex">
            <span className="font-bold  text-md mr-4">{sendername}</span>
            <span className="mr-2">|</span>
            <span className="font-bold text-md mr-4">{sentBy}</span>
          </div>

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
          <span className="">
            <b>
              <i>{subject}</i>
            </b>
          </span>
          <span className="ml-2 mr-2">|</span>
          <span className="text-md text-center">{body}</span>
          <span className="text-sm text-gray-500 ml-auto">
            {date.toLocaleTimeString()}
            {date.toLocaleDateString()}
          </span>
          <motion.button
            className="ml-4 text-gray-500"
            whileHover={{ scale: 1.1 }}
            onClick={toggleOptions}
          >
            <MdMoreVert />
          </motion.button>
        </div>
        {showOptions && (
          <div
            className="absolute top-5 -right-20 mt-1 z-40 bg-white border border-gray-200 rounded-lg shadow-lg p-2   dropdown-options"
            onMouseLeave={() => setShowOptions(false)}
          >
            <button
              className="flex items-center w-full py-1 px-2 text-left text-gray-600 hover:bg-gray-300 "
              onClick={handleDelete}
            >
              <AiOutlineDelete className="mr-2" />
              Delete
            </button>
            <button
              className="flex items-center w-full py-1 px-2 text-left text-gray-600 hover:bg-gray-100"
              onClick={handleSpam}
            >
              <AiOutlineFlag className="mr-2" />
              Spam
            </button>
            <button
              className="flex items-center w-full py-1 px-2 text-left text-gray-600 hover:bg-gray-100"
              onClick={handleMark}
            >
              <AiOutlineCheck className="mr-2" />
              Mark
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default ReceivedMailList;
