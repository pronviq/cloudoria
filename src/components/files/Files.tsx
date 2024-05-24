import React, { memo, useEffect, useState } from "react";
import "./Files.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ListFile from "./ListFile";
import SimpleBar from "simplebar-react";
import FileService from "../../services/FileService";
import { setCurrentFiles } from "../../redux/fileSlice";
import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import { useLocation } from "react-router-dom";

const Files: React.FC = () => {
  const files = useAppSelector((state) => state.fileReducer.currentFiles);
  const currentDir = useAppSelector((state) => state.fileReducer.currentDir);
  const user = useAppSelector((state) => state.userReducer);
  const stack = useAppSelector((state) => state.fileReducer.stack);
  console.log("files render");

  const [isLoading, setLoading] = useState<boolean>(true);

  const dispatch = useAppDispatch();
  const location = useLocation();

  const fetchFiles = async () => {
    try {
      setLoading(true);
      if (location.pathname === "/favorites" && stack.length === 0) {
        const response = await FileService.getFavorites();
        const data = response.data;
        dispatch(setCurrentFiles(data));
      } else if (location.pathname === "/trash") {
        const response = await FileService.getTrash();
        const data = response.data;
        console.log("data is", data);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [location, currentDir]);

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
      <SimpleBar style={{ maxHeight: "100%" }}>
        {files?.map((file, i) => (
          <ListFile index={i} key={i} file={file} />
        ))}
      </SimpleBar>
    </div>
  );
};

export default Files;
