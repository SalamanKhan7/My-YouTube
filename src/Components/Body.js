import React from "react";
import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";
import ButtonsList from "./ButtonsList";

const Body = () => {
  return (
    <div className="grid grid-flow-col ">
      <SideBar />

      <Outlet />
    </div>
  );
};

export default Body;
