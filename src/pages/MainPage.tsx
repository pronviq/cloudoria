import React, { memo, useEffect } from "react";
import "./MainPage.scss";
import Main from "../components/Main";
import NavBar from "../components/ui/navbar/NavBar";
import UploadingFiles from "../components/files/UploadingFiles";
import { useAppSelector } from "../hooks/redux";

const MainPage: React.FC = () => {
  const uploadingFiles = useAppSelector((state) => state.uploadReducer.files);

  return (
    <div className="mainpage">
      <div className="container">
        <NavBar />
        <Main />
        {uploadingFiles.length > 0 ? <UploadingFiles /> : null}
      </div>
    </div>
  );
};

export default MainPage;
