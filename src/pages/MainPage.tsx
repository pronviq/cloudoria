import React, { useEffect } from "react";
import "./MainPage.scss";
import Main from "../components/Main";
import NavBar from "../components/ui/navbar/NavBar";
import UploadingFiles from "../components/files/UploadingFiles";
import { useAppSelector } from "../hooks/redux";
import PopupMenu from "../components/ui/popup/PopupMenu";
import UserService from "../services/UserService";

const MainPage: React.FC = () => {
  const uploadingFiles = useAppSelector((state) => state.uploadReducer.files);

  const fetchAvatar = async () => await UserService.getAvatar();
  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <div className="mainpage">
      <PopupMenu />
      <div className="container">
        <NavBar />
        <Main />
        {uploadingFiles.length > 0 ? <UploadingFiles /> : null}
      </div>
    </div>
  );
};

export default MainPage;
