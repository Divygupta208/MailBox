import React from "react";
import { motion } from "framer-motion";
import { MdSendTimeExtension, MdStarBorder } from "react-icons/md";
const ReceivedMailList = ({ sentBy, starred, subject, body, timestamp }) => {
  const date = new Date(timestamp);

  return (
    <motion.div
      className="rounded-lg shadow-lg  border-gray-300 p-2 flex flex-col w-[80vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <input type="checkbox" className="mr-4" />
        <span className="font-bold mr-4">{sentBy}</span>
        {starred ? (
          <span className="text-yellow-500 mr-4">⭐</span>
        ) : (
          <span className="text-yellow-500 mr-4 ">
            <MdStarBorder />
          </span>
        )}
        <div className="flex">
          <span className="flex-grow">
            <i>{subject}</i>
          </span>
          <span>|</span>
          <div className="text-md text-center ml-4">{body}</div>
        </div>

        <span className="text-sm text-gray-500 ml-auto">
          {date.toLocaleTimeString()}
          {date.toLocaleDateString()}
        </span>
      </div>
    </motion.div>
  );
};

export default ReceivedMailList;
