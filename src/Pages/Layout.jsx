import React from "react";
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";
const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
