import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import Main from "../components/Main";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  async function checkAuth() {
    try {
      setIsLoaded(false);
      await new Promise((res) => setTimeout(res, 1000));
      const response = await AuthService.refresh();
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access);
      }
    } catch (error: any) {
      navigate("/auth");
      setIsLoaded(true);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isLoaded) {
    return (
      // <div className="mainpage">
      <div className="mainpage_forloader">
        <div className="loader" />
      </div>
      // </div>
    );
  }

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
              <li>Избранное</li>
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
