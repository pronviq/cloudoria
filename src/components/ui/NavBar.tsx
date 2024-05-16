import React from "react";
import "./NavBar.scss";
import FreeSpace from "../../components/FreeSpace";
import TrashSvg from "../../images/TrashSvg";
import FavoriteSvg from "../../images/FavoriteSvg";
import FilesSvg from "../../images/FilesSvg";
import CloudSvg from "../../images/CloudSvg";
import UploadSvg from "../../images/UploadSvg";

const NavBar: React.FC = () => {
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
      <ul className="navlist">
        <li>
          <button className="navlist_item">
            <FilesSvg />
            <p>Все файлы</p>
          </button>
        </li>
        <li>
          <button className="navlist_item">
            <FavoriteSvg />
            <p>Избранное</p>
          </button>
        </li>
        <li>
          <button className="navlist_item">
            <TrashSvg />
            <p>Корзина</p>
          </button>
        </li>
      </ul>

      <FreeSpace />
    </nav>
  );
};

export default NavBar;
