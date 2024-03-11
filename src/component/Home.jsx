import React from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  //   const completeProfile = () => {
  //     navigate("/profile");
  //   };

  return (
    <>
      <div className="home text-center mt-[20vw] text-3xl text-white">
        Welcome To Your Mail Box
      </div>
      <div className=" h-20  absolute inset-0 left-10 flex align-middle justify-between top-[90vh]">
        <div className="mt-5 text-white">Welcome User !!</div>
        <div className="mr-10 mb-5 flex align-middle mt-5 gap-4 text-white rounded-xl p-1">
          <div>your profile is incomplete !!</div>

          <motion.button
            // onClick={completeProfile}
            whileHover={{
              scale: 1.1,
              transition: {
                type: "spring",
                bounce: 0.3,
                damping: 5,
              },
            }}
            className="bg-violet-700 text-white h-auto rounded-xl p-1"
          >
            Complete Profile
          </motion.button>

          <motion.div
            className="mt-1 text-2xl"
            whileHover={{ scale: 1.2 }}
            animate={{
              translateX: [-10, -5, 0, 5, 10],
              transition: {
                ease: "linear",
                repeat: Infinity,
                duration: 0.7,
              },
              opacity: 0,
            }}
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;
