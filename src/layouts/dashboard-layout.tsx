import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";
import React from "react";

export default function DashboardLayout() {
  return (
    <React.Fragment>
      <div className="flex gap-2">
        <div className="flex w-[20%]">
          <SideBar />
        </div>
        <div className="flex-col w-[80%]">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
}
