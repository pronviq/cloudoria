import React, { memo, useEffect } from "react";
import "./MainPage.scss";
import Main from "../components/Main";
import NavBar from "../components/ui/NavBar";

const MainPage: React.FC = ({}) => {
  return (
    <div className="mainpage">
      <div className="container">
        <div className="content">
          <NavBar />
          <Main />
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default MainPage;
