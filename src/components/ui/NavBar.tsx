import React, { memo } from "react";
import "./NavBar.scss";
import FreeSpace from "../../components/FreeSpace";
import TrashSvg from "../../images/TrashSvg";
import FavoriteSvg from "../../images/FavoriteSvg";
import FilesSvg from "../../images/FilesSvg";
import CloudSvg from "../../images/CloudSvg";
import UploadSvg from "../../images/UploadSvg";
import CreateDir from "./CreateDir";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  console.log("navbar render");

  return (
    <nav className="nav">
      <div className="nav_head">
        <CloudSvg />
        <h1 className="nav_title">CloudStorage</h1>
      </div>
      <button className="upload_btn">
        <div className="upload_title">Загрузить</div>
        <UploadSvg />
      </button>
      <CreateDir />

      <ul className="navlist">
        <li>
          <button>
            <Link className="navlist_item" to="/">
              <FilesSvg />
              <p>Все файлы</p>
            </Link>
          </button>
        </li>
        <li>
          <button>
            <Link className="navlist_item" to="/favorites">
              <FavoriteSvg width="20px" />
              <p>Избранное</p>
            </Link>
          </button>
        </li>
        <li>
          <button>
            <Link className="navlist_item" to="/trash">
              <TrashSvg width="20px" />
              <p>Корзина</p>
            </Link>
          </button>
        </li>
      </ul>

      <FreeSpace />
    </nav>
  );
};

export default memo(NavBar);
