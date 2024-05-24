import React, { memo } from "react";
import "./Main.scss";
import FilterDropDown from "./ui/FilterDropDown";
import UserSettings from "./ui/UserSettings";
import StackFiles from "./files/StackFiles";
import { Outlet, useLocation } from "react-router-dom";
import Search from "./Search";

const Main: React.FC = () => {
  const location = useLocation();

  return (
    <main className="main">
      <header className="header">
        {location.pathname === "/search" ? <Search /> : <StackFiles />}
        <FilterDropDown />
        <UserSettings />
      </header>
      <Outlet />
    </main>
  );
};

export default memo(Main);
