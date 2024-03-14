import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useState } from "react";
import { SlMenu } from "react-icons/sl";
import { TfiWrite } from "react-icons/tfi";
import { BsFillInboxesFill } from "react-icons/bs";
import { RiMailSendFill } from "react-icons/ri";
import { RiDraftLine } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import { Link, Navigate } from "react-router-dom";
import ComposeMailForm from "./ComposeMail";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

const IconSideNav = () => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(0);
  const expandSideBar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="text-slate-100">
      <SideNav
        expanded={expanded}
        expandSideBar={expandSideBar}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

const SideNav = ({ expanded, expandSideBar, selected, setSelected }) => {
  const dispatch = useDispatch();

  const showCompose = () => {
    dispatch(uiActions.setShowCompose());
  };

  return (
    // NOTE: In prod, you'd likely set height to h-screen and fix to the viewport
    <motion.nav
      className={`h-[100vh] w-fit bg-[#fddddd] p-4 flex flex-col items-center gap-2 relative  `}
      initial={{ width: "70px", x: -100 }} // Initial width of the sidebar
      animate={{
        width: expanded ? "250px" : "80px",
        x: 0,
      }} // Expanded or collapsed width
      transition={{
        width: { duration: 0.3, ease: "easeInOut" },
        x: { duration: 1 },
      }} // Animation duration and easing function
    >
      {/* Temp logo from https://logoipsum.com/ */}

      <button
        onClick={expandSideBar}
        className="absolute mt-6 bg-black p-2 rounded-full"
      >
        <SlMenu />
      </button>

      <div className="flex gap-4 justify-center mt-20" onClick={showCompose}>
        <Link to={"/Home/compose"}>
          <NavItem selected={selected === 0} id={0} setSelected={setSelected}>
            <TfiWrite />
          </NavItem>
        </Link>
        {expanded && <div className="bold">Tailwind css</div>}
      </div>

      <NavItem selected={selected === 1} id={1} setSelected={setSelected}>
        <BsFillInboxesFill />
      </NavItem>
      <NavItem selected={selected === 2} id={2} setSelected={setSelected}>
        <RiMailSendFill />
      </NavItem>
      <NavItem selected={selected === 3} id={3} setSelected={setSelected}>
        <RiDraftLine />
      </NavItem>
      <NavItem selected={selected === 4} id={4} setSelected={setSelected}>
        <FaTrashAlt />
      </NavItem>
    </motion.nav>
  );
};

const NavItem = ({ children, selected, id, setSelected }) => {
  return (
    <motion.button
      className="p-3 text-xl bg-black hover:bg-[#FA255E] rounded-3xl transition-colors relative"
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-[#871937] z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          ></motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default IconSideNav;
