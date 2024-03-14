import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";

import IconSideNav from "../component/SideBar";
import ComposeMail from "../component/ComposeMail";
const Layout = () => {
  return (
    <>
      <Navbar />
      <IconSideNav />
      <Outlet />
    </>
  );
};

export default Layout;
