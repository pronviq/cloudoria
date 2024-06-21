import React, { memo } from "react";
import "./Main.scss";
import FilterDropDown from "./ui/header/FilterDropDown";
import UserSettings from "./ui/header/UserSettings";
import StackFiles from "./files/StackFiles";
import { Outlet, useLocation } from "react-router-dom";
import Search from "./ui/header/Search";
import FileSelection from "./files/FileSelection";
import MobileNav from "./ui/navbar/MobileNav";
import MobileUploading from "./files/MobileUploading";

const Main: React.FC = () => {
  const location = useLocation();

  return (
    <main className="main">
      {<FileSelection />}
      <header className="header">
        {location.pathname === "/search" ? <Search /> : <StackFiles />}
        <MobileUploading />

        <FilterDropDown />
        <UserSettings />
      </header>
      <div className="main_outlet">
        <div className="main_outlet_content">
          <Outlet />
        </div>
        <footer className="main_outlet_footer">
          <MobileNav />
        </footer>
      </div>
    </main>
  );
};

export default memo(Main);
