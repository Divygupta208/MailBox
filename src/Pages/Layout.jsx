import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

import IconSideNav from "../component/SideBar";
import ComposeMail from "../component/ComposeMail";
import UserProfile from "../component/UserProfile";
const Layout = () => {
  return (
    <>
      <Navbar />
      <IconSideNav />
      <ComposeMail />
      <UserProfile />
      <Outlet />
    </>
  );
};

export default Layout;
