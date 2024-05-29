import React, { memo, useEffect, useState } from "react";
import "./Files.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ListFile from "./ListFile";
import SimpleBar from "simplebar-react";
import FileService from "../../services/FileService";
import { setCurrentFiles, setLoading } from "../../redux/fileSlice";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import { useLocation } from "react-router-dom";

const Files: React.FC = () => {
  const files = useAppSelector((state) => state.fileReducer.currentFiles);
  const currentDir = useAppSelector((state) => state.fileReducer.currentDir);
  const user = useAppSelector((state) => state.userReducer);
  const stack = useAppSelector((state) => state.fileReducer.stack);
  const isLoading = useAppSelector((state) => state.fileReducer.isLoading);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const fetchFiles = async () => {
    try {
      dispatch(setLoading(true));

      if (location.pathname === "/favorites" && stack.length === 0) {
        const response = await FileService.getFavorites();
        const data = response.data;
        dispatch(setCurrentFiles(data));
      } else if (location.pathname === "/trash") {
        const response = await FileService.getTrash();
        const data = response.data;
        // console.log("data is", data);

        dispatch(setCurrentFiles(data));
      } else if (
        location.pathname === "/" ||
        (location.pathname === "/favorites" && stack.length > 0)
      ) {
        const data = await FileService.getFiles(currentDir);
        dispatch(setCurrentFiles(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [location, currentDir]);

  // console.log(files);

  if (isLoading) {
    return (
      <div className="files">
        <div className="loader_container">
          <div className="spinner_loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="files">
      <SimpleBar className="files_simplebar" style={{ maxHeight: "100%", height: "100%" }}>
        {files?.map(
          (file, i) =>
            ((file.is_trash && location.pathname === "/trash") ||
              (!file.is_trash && location.pathname !== "/trash")) && (
              <ListFile duration={(0.5 / files.length) * (i + 1)} index={i} key={i} file={file} />
            )
        )}
      </SimpleBar>
    </div>
  );
};

export default Files;
