import React from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import ComposeMailForm from "./ComposeMail";
const Home = () => {
  const navigate = useNavigate();

  //   const completeProfile = () => {
  //     navigate("/profile");
  //   };

  return (
    <>
      <div className="text-center mt-[-50vh] text-3xl ">
        Welcome To Your Mail Box
      </div>
    </>
  );
};

export default Home;
