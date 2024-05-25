import React, { ChangeEventHandler, memo, useState } from "react";
import "./NavBar.scss";
import FreeSpace from "../../components/FreeSpace";
import TrashSvg from "../../images/TrashSvg";
import FavoriteSvg from "../../images/FavoriteSvg";
import FilesSvg from "../../images/FilesSvg";
import CloudSvg from "../../images/CloudSvg";
import UploadSvg from "../../images/UploadSvg";
import CreateDir from "./CreateDir";
import { Link } from "react-router-dom";
import FileService from "../../services/FileService";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { pushFile, setCurrentDir, updateStack } from "../../redux/fileSlice";
import { updateSize } from "../../redux/userSlice";
import SearchSvg from "../../images/SearchSvg";
import ArrowSvg from "../../images/ArrowSvg";
import { AnimatePresence, motion } from "framer-motion";

const NavBar: React.FC = () => {
  const currentDir = useAppSelector((state) => state.fileReducer.currentDir);
  const dispatch = useAppDispatch();
  const [isActive, setActive] = useState<boolean>(false);
  const user = useAppSelector((state) => state.userReducer);
  const currfiles = useAppSelector((state) => state.fileReducer.currentFiles);

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    try {
      if (e.target.files) {
        const keys = Object.keys(e.target.files);
        keys.forEach(async (key) => {
          if (e.target.files) {
            const file = await FileService.uploadFile(e.target.files[Number(key)], currentDir);

            if (file) {
              const size = file.size;
              dispatch(updateSize(size));
              dispatch(pushFile(file));
            }
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocation = () => {
    setActive(false);
    dispatch(updateStack([]));
    dispatch(setCurrentDir(user.root_directory));
  };

  return (
    <nav
      className="nav"
      style={{ marginLeft: isActive ? "0px" : "-203px", transition: "margin .1s linear" }}
    >
      <div className="nav_content">
        <div className="nav_head">
          <CloudSvg />
          <h1 className="nav_title">CloudStorage</h1>
        </div>
        <input onChange={handleUpload} id="file_upload" hidden={true} type="file" multiple />
        <button className="upload_btn">
          <label htmlFor="file_upload">
            <div className="upload_title">Загрузить</div>
            <UploadSvg />
          </label>
        </button>
        <CreateDir />

        <ul className="navlist">
          <li>
            <button onClick={handleLocation}>
              <Link className="navlist_item" to="/">
                <FilesSvg />
                <p>Все файлы</p>
              </Link>
            </button>
          </li>
          <li>
            <button onClick={handleLocation}>
              <Link className="navlist_item" to="/favorites">
                <FavoriteSvg width="20px" />
                <p>Избранное</p>
              </Link>
            </button>
          </li>
          <li>
            <button onClick={handleLocation}>
              <Link className="navlist_item" to="/search">
                <SearchSvg width="20px" />
                <p>Поиск</p>
              </Link>
            </button>
          </li>
          <li>
            <button onClick={handleLocation}>
              <Link className="navlist_item" to="/trash">
                <TrashSvg width="20px" />
                <p>Корзина</p>
              </Link>
            </button>
          </li>
        </ul>

        <FreeSpace />
      </div>
      <div onClick={() => setActive((p) => !p)} className="nav_display">
        <ArrowSvg transition="ease .2s" rotate={isActive ? "90deg" : "-90deg"} />
      </div>
    </nav>
  );
};

export default memo(NavBar);
