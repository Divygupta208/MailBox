import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdHome } from "react-icons/io";
import { RiAccountBoxFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const userMail = useParams();
  const showProfileModal = () => {
    dispatch(uiActions.setShowProfile());
  };
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
      className="bg-[#232323] dark:bg-white h-[8vh] w-[100vw] flex items-center justify-between p-6 shadow-lg"
    >
      <div className="flex items-center">
        <img className="w-10 mr-4" src="/ezgif-1-51173bd78e.gif" alt="Logo" />
        <span>
          <motion.span
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-2xl font-bold font-custom"
          >
            go
          </motion.span>
          <motion.span
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white text-2xl font-bold font-custom"
          >
            mail
          </motion.span>
        </span>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="relative bg-gray-100 text-black px-4 py-2 rounded focus:outline-none "
      />

      <ul className="flex items-center">
        <motion.li whileHover={{ scale: 1.1 }}>
          <Link
            className="text-[#ffffff] dark:text-black dark:font-medium mr-4 text-sm"
            to={`/${userMail.id}/Home`}
          >
            <IoMdHome className="text-xl ml-2 text-[#ff3636]" />
            Home
          </Link>
        </motion.li>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="text-[#ffffff]"
          onClick={showProfileModal}
        >
          <RiAccountBoxFill className="text-xl ml-2 text-[#38ffcd]" />
          Profile
        </motion.button>
      </ul>
    </motion.div>
  );
};

export default Navbar;
