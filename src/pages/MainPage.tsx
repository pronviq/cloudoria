import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import Main from "../components/Main";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { AuthResponse } from "../models/AuthResponse";
import { AxiosError, AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { setUser } from "../redux/userSlice";
import FreeSpace from "../components/FreeSpace";
import TrashSvg from "../images/TrashSvg";
import FavoriteSvg from "../images/FavoriteSvg";
import FilesSvg from "../images/FilesSvg";
import CloudSvg from "../images/CloudSvg";
import UploadSvg from "../images/UploadSvg";
import { useTheme } from "../components/contexts/theme/Theme.context";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { theme } = useTheme();

  async function checkAuth() {
    setIsLoaded(false);
    // await new Promise((res) => setTimeout(res, 1000)); // just to have it

    await AuthService.refresh()
      .then((response: AxiosResponse<AuthResponse>) => {
        const user: IUser = {
          id: response.data?.id,
          username: response.data?.username,
          email: response.data?.email,
          disk_space: response.data?.disk_space,
          used_space: response.data?.used_space,
          gender: response.data?.gender,
        };
        // console.log(response.data);

        localStorage.setItem("token", response.data.access);
        dispatch(setUser(user));
      })
      .catch((error: AxiosError) => {
        // navigate("/auth");
        setIsLoaded(true);
      })
      .finally(() => setIsLoaded(true));
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isLoaded) {
    return (
      <div className="mainpage_forloader">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="mainpage">
      <div className="container">
        <div className="content">
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
          <Main />
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default MainPage;
