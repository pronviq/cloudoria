import React, { useEffect, useState } from "react";
import "./ThemeChanger.scss";
import MoonSvg from "../../images/MoonSvg";
import SunSvg from "../../images/SunSvg";
import { useTheme } from "../contexts/theme/Theme.context";

const ThemeChanger: React.FC = () => {
  const { setCurrentTheme, theme } = useTheme();
  const [isActive, setActive] = useState<boolean>(theme.theme === "dark");
  // console.log(...theme);

  useEffect(() => {
    if (isActive) {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }
  }, [isActive]);

  return (
    <div onClick={() => setActive((p) => !p)} className="themechanger">
      <p>Тема</p>
      <div className="themeswitcher" style={{ ...(theme as React.CSSProperties) }}>
        <div style={{ marginLeft: isActive ? "22px" : "0px" }} className={"themethumb"}>
          {isActive ? <MoonSvg /> : <SunSvg />}
        </div>
      </div>
    </div>
  );
};

export default ThemeChanger;
