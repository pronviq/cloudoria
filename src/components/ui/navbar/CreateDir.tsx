import React, { useEffect, useRef, useState } from "react";
import "./CreateDir.scss";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import FileService from "../../../services/FileService";
import { IFile } from "../../../models/File.model";
import { pushFile } from "../../../redux/fileSlice";
import { updateSize } from "../../../redux/userSlice";
import MyInput from "../MyElements/MyInput";
import { useLocation } from "react-router-dom";
import { setName } from "../../../redux/popupSlice";
import StringValidator from "../../../utils/StringValidator";

const CreateDir: React.FC = () => {
  const [naming, setNaming] = useState<string>("Новая папка");
  const [error, setError] = useState<any>("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentDir = useAppSelector((state) => state.fileReducer.currentDir);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const createDir = async () => {
    try {
      const dir: IFile = await FileService.createDir(currentDir, naming);
      location.pathname === "/" && dispatch(pushFile(dir));
      dispatch(updateSize(dir.size));
      dispatch(setName(""));
    } catch (err: any) {
      setError(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="createdir_menu">
      <div className="createdir_header">Укажите название папки </div>
      <div className="createdir_input">
        <MyInput
          reference={inputRef}
          onChange={(val) => {
            setError("");
            setNaming(val);
          }}
          type="text"
          value={naming}
          onKeyDown={(e) => {
            if (e.key === "Enter") createDir();
          }}
        />
        {error && <div className="createdir_error">{error}</div>}
      </div>

      <button onClick={createDir} className="createdir_action">
        Создать
      </button>
    </div>
  );
};

export default CreateDir;
