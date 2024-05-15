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

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
              <div className="title_cloud" />
              <h1 className="nav_title">CloudStorage</h1>
            </div>
            <button className="upload_btn">
              <div className="upload_title">Загрузить</div>
              <div className="upload_svg" />
            </button>
            <ul className="navlist">
              <li>
                <button className="navlist_item">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 7V13.8C19 14.9201 19 15.4802 18.782 15.908C18.5903 16.2843 18.2843 16.5903 17.908 16.782C17.4802 17 16.9201 17 15.8 17H12.2C11.0799 17 10.5198 17 10.092 16.782C9.71569 16.5903 9.40973 16.2843 9.21799 15.908C9 15.4802 9 14.9201 9 13.8V6.2C9 5.0799 9 4.51984 9.21799 4.09202C9.40973 3.71569 9.71569 3.40973 10.092 3.21799C10.5198 3 11.0799 3 12.2 3H15M19 7L15 3M19 7H16.6C16.0399 7 15.7599 7 15.546 6.89101C15.3578 6.79513 15.2049 6.64215 15.109 6.45399C15 6.24008 15 5.96005 15 5.4V3M5 7V14.6C5 16.8402 5 17.9603 5.43597 18.816C5.81947 19.5686 6.43139 20.1805 7.18404 20.564C8.03969 21 9.15979 21 11.4 21H15"
                      stroke="#000000"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p>Все файлы</p>
                </button>
              </li>
              <li>
                <button className="navlist_item">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.051 45.6071L17.851 54.7401C17.2728 55.1729 16.5856 55.4363 15.8662 55.5008C15.1468 55.5652 14.4237 55.4282 13.7778 55.1049C13.1319 54.7817 12.5887 54.2851 12.209 53.6707C11.8293 53.0563 11.6281 52.3483 11.628 51.626V15.306C11.628 13.2423 12.4477 11.2631 13.9069 9.8037C15.3661 8.34432 17.3452 7.52431 19.409 7.52405H45.35C47.4137 7.52431 49.3929 8.34432 50.8521 9.8037C52.3112 11.2631 53.131 13.2423 53.131 15.306V51.625C53.1309 52.3473 52.9297 53.0553 52.55 53.6697C52.1703 54.2841 51.6271 54.7807 50.9812 55.1039C50.3353 55.4272 49.6122 55.5642 48.8928 55.4998C48.1734 55.4353 47.4862 55.1719 46.908 54.739L34.715 45.6071C34.0419 45.1031 33.2238 44.8308 32.383 44.8308C31.5422 44.8308 30.724 45.1031 30.051 45.6071V45.6071Z"
                      stroke="#000"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p>Избранное</p>
                </button>
              </li>
              <li>
                <button className="navlist_item">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M20.5001 6H3.5"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M9.5 11L10 16"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M14.5 11L14 16"
                      stroke="#000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                      stroke="#000"
                      stroke-width="1.5"
                    />
                  </svg>
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
