import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SlMenu } from "react-icons/sl";
import { TfiWrite } from "react-icons/tfi";
import { BsFillInboxesFill } from "react-icons/bs";
import { RiMailSendFill } from "react-icons/ri";
import { RiDraftLine } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { BsShieldFillX } from "react-icons/bs";
import Navbar from "./Navbar";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import ComposeMailForm from "./ComposeMail";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { Example } from "./NeuButton";

const IconSideNav = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const userMail = useParams();
  const [selected, setSelected] = useState(0);
  const expandSideBar = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === `/${userMail.id}/Home/compose`) {
      setSelected(0);
    } else if (pathname === `/${userMail.id}/Home/inbox`) {
      setSelected(1);
    } else if (pathname === `/${userMail.id}/Home/sent`) {
      setSelected(2);
    } else if (pathname === `/${userMail.id}/Home/drafts`) {
      setSelected(3);
    } else if (pathname === `/${userMail.id}/Home/deleted`) {
      setSelected(4);
    } else if (pathname === `/${userMail.id}/Home/spam`) {
      setSelected(5);
    }
  }, [location.pathname]);

  return (
    <div className={`text-slate-100`}>
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
  const totalUnread = useSelector((state) => state.mails.totalUnread);

  const dispatch = useDispatch();

  const showCompose = () => {
    dispatch(uiActions.setShowCompose());
  };

  return (
    <motion.nav
      className={`h-[100vh] bg-[#3f3f3f] p-4 flex flex-col items-center gap-2 relative
      `}
      initial={{ width: "70px", x: -100 }}
      animate={{
        width: expanded ? "170px" : "70px",

        x: 0,
      }}
      transition={{
        width: { duration: 0.4 },
        x: { duration: 1 },
      }}
    >
      <div onClick={expandSideBar}>
        <Example />
      </div>

      <div className="flex gap-5 justify-center mt-20" onClick={showCompose}>
        {/* <Link to={"compose"}> */}
        <NavItem
          selected={selected === 0}
          id={0}
          setSelected={setSelected}
          expanded={expanded}
        >
          <TfiWrite />
          {expanded && <span className="ml-2 text-sm">Compose</span>}
        </NavItem>
        {/* </Link> */}
      </div>

      <Link to={"inbox"}>
        <NavItem
          selected={selected === 1}
          id={1}
          setSelected={setSelected}
          expanded={expanded}
        >
          <BsFillInboxesFill />
          {expanded && <span className="ml-2 text-sm">Inbox</span>}
          {totalUnread > 0 && !expanded && (
            <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-4 dark:border-gray-900">
              {totalUnread}
            </div>
          )}
          {totalUnread > 0 && expanded && (
            <div class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0 -end-0 dark:border-gray-900">
              {totalUnread}
            </div>
          )}
        </NavItem>
      </Link>

      <Link to={"sent"}>
        <NavItem
          selected={selected === 2}
          id={2}
          setSelected={setSelected}
          expanded={expanded}
        >
          <RiMailSendFill />
          {expanded && <span className="ml-2 text-sm">Sent</span>}
        </NavItem>
      </Link>

      <NavItem
        selected={selected === 3}
        id={3}
        setSelected={setSelected}
        expanded={expanded}
      >
        <RiDraftLine />
        {expanded && <span className="ml-2 text-sm">Draft</span>}
      </NavItem>

      <NavItem
        selected={selected === 4}
        id={4}
        setSelected={setSelected}
        expanded={expanded}
      >
        <FaTrashAlt />
        {expanded && <span className="ml-2 text-sm">Trash</span>}
      </NavItem>
      <Link to={"spam"}>
        <NavItem
          selected={selected === 5}
          id={5}
          setSelected={setSelected}
          expanded={expanded}
        >
          <BsShieldFillX />
          {expanded && <span className="ml-2 text-sm">Spam</span>}
        </NavItem>
      </Link>
    </motion.nav>
  );
};

const NavItem = ({ children, selected, id, setSelected, expanded }) => {
  return (
    <motion.button
      className={`p-3 text-xl bg-black hover:bg-[#04ffd9] hover:text-black rounded-3xl transition-colors relative ${
        expanded ? "ml-[-2rem]" : ""
      }
        `}
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className={`${expanded ? "w-24" : ""}  relative flex z-10`}>
        {children}
      </span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className=" absolute inset-0  bg-[#7122e0] z-[1] "
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
