import React, { startTransition, useEffect, useRef, useState } from "react";
import "./UserSettings.scss";
import AuthService from "../../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { initialState, setUser } from "../../../redux/userSlice";
import SettingsSvg from "../../../images/SettingsSvg";
import ExitSvg from "../../../images/ExitSvg";
import ThemeChanger from "./ThemeChanger";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedDropDown } from "../../../models/Animation.model";
import AvatarSvg from "../../../images/AvatarSvg";

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
        startTransition(() => navigate("/auth"));
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
        {user.avatar !== "empty" ? (
          <img src={user.avatar} className="avatar" alt="" />
        ) : (
          <AvatarSvg />
        )}
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div {...AnimatedDropDown} ref={contentRef} className={`user_settings_content`}>
            <div className="user_settings_info">
              {user.avatar !== "empty" ? (
                <img src={user.avatar} className="avatar" alt="" />
              ) : (
                <AvatarSvg width="35px" />
              )}
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
                      setActive(false);
                    }}
                    className="user_settings_item"
                    to={"/settings"}
                  >
                    <SettingsSvg width="16px" />
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
