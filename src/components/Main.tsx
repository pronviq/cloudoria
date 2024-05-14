import React from "react";
import "./Main.scss";
import FilterDropDown from "./ui/FilterDropDown";
import UserSettings from "./ui/UserSettings";

const Main: React.FC = () => {
  return (
    <main className="main">
      <header className="header">
        <div className="header_title">Все файлы</div>
        <FilterDropDown />
        <UserSettings />
      </header>
    </main>
  );
};

export default Main;
