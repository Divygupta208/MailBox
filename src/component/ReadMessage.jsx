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
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { mailAction } from "../store/mails-slice";

const ReadMessage = () => {
  const userMail = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const receivedMails = useSelector((state) => state.mails.receivedMails);
  const notify = (message) => toast(message);
  const decodedMail = userMail?.id.replace("@", "%40").replace(".", "%25");
  const { email } = location.state;

  const handleCloseModal = () => {
    navigate(`/${userMail.id}/Home/inbox`);
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

      notify("Mail Deleted Succesfully");
      navigate(`/${userMail.id}/Home/inbox`);
    } catch (error) {
      console.error("Error deleting mail:", error);
    }
  };

  return (
    <>
      <motion.div
        drag
        dragElastic={false}
        dragConstraints={{ bottom: 100, left: -70, right: 0, top: -400 }}
        initial={{ opacity: 0, y: 200, x: 400 }}
        animate={{ opacity: 1, y: -150, x: -30 }}
        exit={{ opacity: 1, y: 200 }}
        transition={{ duration: 0.5 }}
        className=" inset-5 items-center justify-center z-60 h-[90vh] "
      >
        <div className="bg-[#ffffff] border-2 w-[93vw] md:w-full rounded-lg ml-[-7vw] md:ml-0 h-[90vh] md:h-full overflow-hidden shadow-xl mt-[-18vh] md:mt-0">
          <div className="text-violet-900 border-gray-400 shadow-xl flex p-4 gap-4">
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
            <div className="text-sm flex gap-6 md:ml-[15rem]">
              ||
              <button className="flex gap-1">
                <IoArchive className="text-lg text-black" />
                <span className="text-sm">Archive</span>
              </button>
              <button className="flex gap-1 hover:bg-slate-300">
                <MdDriveFileMoveRtl className="text-lg text-black" />
                <span className="text-sm">Move</span>
              </button>
              <button
                className="flex gap-1 hover:bg-slate-300"
                onClick={() => deleteMailHandler(email.id)}
              >
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
                <span className="font-bold">{email.sendername}</span>
                <span className="text-gray-400">
                  {"<"}
                  {email.sentBy}
                  {">"}
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
    </>
  );
};

export default ReadMessage;
