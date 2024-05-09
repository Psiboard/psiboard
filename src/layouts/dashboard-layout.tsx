import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar/sidebar";
import React from "react";

export default function DashboardLayout() {
  return (
    <React.Fragment>
      <div className="flex gap-2">
        <div className="flex lg:w-[20%] w-0">
          <SideBar />
        </div>
        <div className="flex-col lg:w-[80%] w-full">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
