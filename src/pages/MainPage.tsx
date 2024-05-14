import React from "react";
import "./MainPage.scss";
import Main from "../components/Main";

const MainPage: React.FC = () => {
  return (
    <div className="mainpage">
      <div className="container">
        <div className="content">
          <nav className="nav">
            <div className="nav_head">
              <div className="title_cloud" />
              <h1 className="nav_title">CloudStorage</h1>
            </div>
            <button className="upload_btn">
              <div className="upload_title">Загрузить</div>
              <div className="upload_svg" />
            </button>
            <ul className="navlist">
              <li>Все файлы</li>
              <li>Корзина</li>
            </ul>
            <div className="freespace">
              <div className="freespace_text">Свободное место</div>
              <div className="freespace_track">
                <div className="freespace_progress"></div>
              </div>
            </div>
          </nav>
          <Main />
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default MainPage;
