import React, { startTransition, useEffect, useRef, useState } from "react";
import "./UserSettings.scss";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { initialState, setUser } from "../../redux/userSlice";
import SettingsSvg from "../../images/SettingsSvg";
import ExitSvg from "../../images/ExitSvg";
import ThemeChanger from "./ThemeChanger";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedDropDown } from "../../models/Animation.model";

const UserSettings: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const user = useAppSelector((state) => state.userReducer);

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
      .catch((error) => navigate("/auth"));
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

      <AnimatePresence>
        {isActive && (
          <motion.div {...AnimatedDropDown} ref={contentRef} className={`user_settings_content`}>
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
                <button>
                  <Link
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      startTransition(() => navigate("/settings"));
                    }}
                    className="user_settings_item"
                    to={"/settings"}
                  >
                    <SettingsSvg />
                    <p>Настройки</p>
                  </Link>
                </button>
              </li>
              <li>
                <button onClick={makeLogout} className="user_settings_item">
                  <ExitSvg />
                  <p>Выйти</p>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserSettings;
