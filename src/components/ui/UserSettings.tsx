import React, { useEffect, useRef, useState } from "react";
import "./UserSettings.scss";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { initialState, setUser } from "../../redux/userSlice";
import SettingsSvg from "../../images/SettingsSvg";
import ExitSvg from "../../images/ExitSvg";
import ThemeChanger from "./ThemeChanger";
import { useTheme } from "../contexts/theme/Theme.context";

const UserSettings: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const user = useAppSelector((state) => state.userReducer);
  const { theme } = useTheme();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFalse = (event: MouseEvent) => {
    const target = (event.target as Node) || null;

    if (!contentRef.current?.contains(target) && !btnRef.current?.contains(target)) {
      setActive(false);
    }
  };

  const makeLogout = async () => {
    await AuthService.logout()
      .then((_) => {
        dispatch(setUser(initialState));
        navigate("/auth");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    document.addEventListener("click", handleFalse);
    return () => document.removeEventListener("click", handleFalse);
  }, []);

  return (
    <div className="user_settings">
      <button onClick={() => setActive((p) => !p)} ref={btnRef} className="user_settings_btn">
        <img src="https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg" alt="" />
      </button>
      {isActive && (
        <div ref={contentRef} className="user_settings_content">
          <div className="user_settings_info">
            <img src="https://99px.ru/sstorage/53/2023/01/mid_348279_833663.jpg" alt="" />
            <div className="user_settings_about">
              <p className="user_nickname">{user.username}</p>
              <p className="user_email">{user.email}</p>
            </div>
          </div>
          <ul className="user_settings_list">
            <li>
              <ThemeChanger />
            </li>
            <li>
              <button className="user_settings_item">
                <SettingsSvg />
                <p>Настройки</p>
              </button>
            </li>
            <li>
              <button onClick={makeLogout} className="user_settings_item">
                <ExitSvg />
                <p>Выйти</p>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
