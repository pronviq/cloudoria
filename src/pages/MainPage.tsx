import React, { memo, useEffect } from "react";
import "./MainPage.scss";
import Main from "../components/Main";
import NavBar from "../components/ui/NavBar";

const MainPage: React.FC = ({}) => {
  return (
    <div className="mainpage">
      <div className="container">
        <NavBar />
        <Main />
      </div>
    </div>
  );
};

export default MainPage;
