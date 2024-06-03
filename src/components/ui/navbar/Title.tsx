import React from "react";
import "./Title.scss";
import CloudSvg from "../../../images/CloudSvg";

const Title: React.FC = () => {
  return (
    <div className="title">
      <CloudSvg height="45px" />
      <div className="title_text">Cloudoria</div>
    </div>
  );
};

export default Title;
