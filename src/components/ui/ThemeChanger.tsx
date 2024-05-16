import React, { useState } from "react";
import "./ThemeChanger.scss";
import MoonSvg from "../../images/MoonSvg";
import SunSvg from "../../images/SunSvg";

const ThemeChanger: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);

  return (
    <div onClick={() => setActive((p) => !p)} className="themechanger">
      <p>Тема</p>
      <div className="themeswitcher">
        <div style={{ marginLeft: isActive ? "22px" : "0px" }} className="themethumb">
          {isActive ? <MoonSvg /> : <SunSvg />}
        </div>
      </div>
    </div>
  );
};

export default ThemeChanger;
