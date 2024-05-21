import React, { memo, useEffect } from "react";
import "./Files.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ListFile from "./ListFile";
import SimpleBar from "simplebar-react";
import FileService from "../../services/FileService";
import { setCurrentFiles } from "../../redux/fileSlice";

const Files: React.FC = () => {
  const files = useAppSelector((state) => state.fileReducer.currentFiles);
  const currentDir = useAppSelector((state) => state.fileReducer.currentDir);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const fetchFiles = async () => {
    try {
      const data = await FileService.getFiles(currentDir);
      dispatch(setCurrentFiles(data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchFiles();
  }, [currentDir]);

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
