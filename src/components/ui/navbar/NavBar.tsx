import React, { ChangeEventHandler, memo, useState } from "react";
import "./NavBar.scss";
import FreeSpace from "./FreeSpace";
import TrashSvg from "../../../images/TrashSvg";
import FavoriteSvg from "../../../images/FavoriteSvg";
import FilesSvg from "../../../images/FilesSvg";
import UploadSvg from "../../../images/UploadSvg";
import { Link } from "react-router-dom";
import FileService from "../../../services/FileService";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { dropSelection, pushFile, setCurrentDir, updateStack } from "../../../redux/fileSlice";
import { updateSize } from "../../../redux/userSlice";
import SearchSvg from "../../../images/SearchSvg";
import ArrowSvg from "../../../images/ArrowSvg";
import Title from "./Title";
import CreateSvg from "../../../images/CreateSvg";
import { setName } from "../../../redux/popupSlice";

const NavBar: React.FC = () => {
  const currentDir = useAppSelector((state) => state.fileReducer.currentDir);
  const dispatch = useAppDispatch();
  const [isActive, setActive] = useState<boolean>(false);
  const user = useAppSelector((state) => state.userReducer);
  const currfiles = useAppSelector((state) => state.fileReducer.currentFiles);

  const handleUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
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
    dispatch(dropSelection());
    dispatch(setCurrentDir(user.root_directory));
  };

  return (
    <nav
      className="nav"
      style={{ marginLeft: isActive ? "0px" : "-203px", transition: "margin .1s linear" }}
    >
      <div className="nav_content">
        <Title />
        <input onChange={handleUpload} id="file_upload" hidden={true} type="file" multiple />
        <button className="upload_btn">
          <label htmlFor="file_upload">
            <div className="upload_title">Загрузить</div>
            <UploadSvg height="100%" />
          </label>
        </button>
        <button onClick={() => dispatch(setName("directory"))} className="upload_btn">
          <div className="upload_title">Создать</div>
          <CreateSvg width="20px" />
        </button>

        <ul className="navlist">
          <li>
            <button onClick={handleLocation}>
              <Link className="navlist_item" to="/">
                <FilesSvg height="100%" />
                <p>Все файлы</p>
              </Link>
            </button>
          </li>
          <li>
            <button onClick={handleLocation}>
              <Link className="navlist_item" to="/favorites">
                <FavoriteSvg height="100%" />
                <p>Избранное</p>
              </Link>
            </button>
          </li>
          <li>
            <button onClick={handleLocation}>
              <Link className="navlist_item" to="/trash">
                <TrashSvg height="100%" />
                <p>Корзина</p>
              </Link>
            </button>
          </li>
          <li>
            <button onClick={handleLocation}>
              <Link className="navlist_item" to="/search">
                <SearchSvg height="100%" />
                <p>Поиск</p>
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
