import React from "react";
import "./Main.scss";

const Main: React.FC = () => {
  return (
    <main className="main">
      <header className="header">
        <div className="header_title">Все файлы</div>
        <div className="view_selector"></div>
        <div className="sort_selector"></div>
        <button className="avatar_btn">
          <img src="" alt="" className="avatar"></img>
        </button>
      </header>
    </main>
  );
};

export default Main;
