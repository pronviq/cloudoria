import React, { useEffect, useState } from "react";
import "./ThemeChanger.scss";
import MoonSvg from "../../../images/MoonSvg";
import SunSvg from "../../../images/SunSvg";
import { useTheme } from "../../../contexts/theme/Theme.context";
import UserService from "../../../services/UserService";
import { useAppSelector } from "../../../hooks/redux";

const ThemeChanger: React.FC = () => {
  const { setCurrentTheme, theme } = useTheme();
  const [isActive, setActive] = useState<boolean>(theme.theme === "dark");

  const changeTheme = async () => {
    try {
      setCurrentTheme(isActive ? "light" : "dark");
      setActive((p) => !p);
      await UserService.updateTheme(isActive ? "light" : "dark");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={changeTheme} className="themechanger">
      <p>Тема</p>
      <div className="themeswitcher">
        <div style={{ marginLeft: isActive ? "22px" : "0px" }} className={"themethumb"}>
          {isActive ? <MoonSvg /> : <SunSvg />}
        </div>
      </div>
    </div>
  );
};

export default ThemeChanger;
