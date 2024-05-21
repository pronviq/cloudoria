import React, { memo } from "react";
import "./Main.scss";
import FilterDropDown from "./ui/FilterDropDown";
import UserSettings from "./ui/UserSettings";
import Files from "./files/Files";
import { useAppSelector } from "../hooks/redux";
import StackFiles from "./files/StackFiles";
import { Outlet } from "react-router-dom";

const Main: React.FC = () => {
  console.log("main rendeer");

  return (
    <main className="main">
      <header className="header">
        <StackFiles />
        <FilterDropDown />
        <UserSettings />
      </header>
      {/* <Files /> */}
      <Outlet />
    </main>
  );
};

export default memo(Main);
