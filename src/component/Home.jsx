import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import ComposeMailForm from "./ComposeMail";
import { mailAction } from "../store/mails-slice";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  return (
    <>
      <img
        src="/Letter-Animation2.gif"
        className="absolute mt-[-100vh] w-full ml-20 z-30"
      />

      <div className="relative z-[-2] mt-[-100vh] w-[100vw] h-[100vh] text-3xl font-custom bg-gradient-to-tl from-slate-400 to-white ">
        <h1 className="absolute text-center ml-[40vw] mt-64">
          <b> Welcome To Your Mail Box</b>
        </h1>
      </div>
    </>
  );
};

export default Home;
