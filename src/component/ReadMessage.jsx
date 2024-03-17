import React from "react";
import { motion } from "framer-motion";
import { MdSendTimeExtension, MdStarBorder } from "react-icons/md";
import { FaReply } from "react-icons/fa";
import { FaReplyAll } from "react-icons/fa";
import { IoReturnUpBack, IoArchive } from "react-icons/io5";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdDriveFileMoveRtl } from "react-icons/md";
import { TiArrowForward } from "react-icons/ti";
import { BsShieldFillX } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ReadMessage = () => {
  const userMail = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state;

  const handleCloseModal = () => {
    navigate(`/${userMail.id}/Home/inbox`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 1, y: 200 }}
      transition={{ duration: 0.5 }}
      className="relative inset-0 items-center justify-center z-50 "
    >
      <div className="bg-[#ffffff] w-[93vw] ml-[-7vw] h-[90vh] overflow-hidden shadow-lg mt-[-13vh]">
        <div className="text-violet-900  border-gray-400 shadow-xl shadow-inner flex p-4 gap-4 ">
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.2 }}
              className="text-gray-500 hover:text-violet-400 flex"
              onClick={handleCloseModal}
            >
              <IoReturnUpBack className="w-5 h-5" />
              back
            </motion.button>
            ||
            <button>
              <FaReply className="hover:text-black" />
            </button>
            <button>
              <FaReplyAll className="hover:text-black" />
            </button>
            <button>
              <TiArrowForward className="text-2xl hover:text-black" />
            </button>
          </div>
          ||
          <div className="text-sm flex gap-6 ml-[15rem]">
            ||
            <button className="flex gap-1">
              <IoArchive className="text-lg text-black" />
              <span className="text-sm">Archive</span>
            </button>
            <button className="flex gap-1">
              <MdDriveFileMoveRtl className="text-lg text-black" />
              <span className="text-sm">Move</span>
            </button>
            <button className="flex gap-1 ">
              <RiDeleteBin4Fill className="text-lg text-black" />
              <span className="text-sm">Delete</span>
            </button>
            <button className="flex gap-1">
              <BsShieldFillX className="text-lg text-black" />
              <span className="text-sm">Spam</span>
            </button>
            ||
          </div>
        </div>
        <div className="bg-[#1e0a3b] p-4 text-white flex justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-5">
            {email.subject} !!
            {email.starred ? (
              <span className="text-yellow-500 mr-4 ">⭐</span>
            ) : (
              <span className="text-yellow-500 mr-4 ">
                <MdStarBorder />
              </span>
            )}
          </h2>
        </div>
        <div className="flex flex-col p-4 flex-grow overflow-y-auto">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="font-bold">Divy Gupta</span>
              <span className="text-gray-400">
                {`<`}
                {email.sentBy}
                {`>`}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">to:</span>
              <span>{userMail.id}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">subject:</span>
              <span>{email.subject}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-semibold mr-2">Date:</span>
              <span>{email.timestamp}</span>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-4">
            <div>{email.body}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReadMessage;
