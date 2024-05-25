import React, { useEffect, useRef, useState } from "react";
import CreateSvg from "../../images/CreateSvg";
import "./CreateDir.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import FileService from "../../services/FileService";
import { IFile } from "../../models/File.model";
import { pushFile } from "../../redux/fileSlice";
import { updateSize } from "../../redux/userSlice";
import MyInput from "./MyInput";

const CreateDir: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const [name, setName] = useState<string>("Новая папка");
  const [error, setError] = useState<any>("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentDir = useAppSelector((state) => state.fileReducer.currentDir);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const createDir = async () => {
    try {
      // console.log("curr dir", currentDir);

      const dir: IFile = await FileService.createDir(currentDir, name);

      // console.log("dir is", dir);
      dispatch(pushFile(dir));
      dispatch(updateSize(dir.size));
      setActive(false);
    } catch (err: any) {
      setError(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    // inputRef.current?.select();
  }, []);

  return (
    <div className="createdir">
      <button onClick={() => setActive(true)} className="upload_btn">
        <div className="upload_title">Создать</div>
        <CreateSvg />
      </button>
      {isActive && (
        <>
          <div className="createdir_menu">
            <div className="createdir_header">Укажите название папки </div>
            <MyInput
              onChange={(val) => {
                setError("");
                setName(val);
              }}
              type="text"
              value={name}
            />

            <button onClick={createDir} className="createdir_action">
              Создать
            </button>
            {error && <div className="createdir_error">{error}</div>}
          </div>
          <div onClick={() => setActive(false)} className="createdir_bg" />
        </>
      )}
    </div>
  );
};

export default CreateDir;
