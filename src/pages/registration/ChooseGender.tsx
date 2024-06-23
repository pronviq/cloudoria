import React, { useState } from "react";
import "./ChooseGender.scss";
import Checkbox from "./Checkbox";

interface IChooseGender {
  gender: string;
  setGender: (gender: string) => void;
}

const ChooseGender: React.FC<IChooseGender> = ({ gender, setGender }) => {
  return (
    <div className="choose_gender">
      <p className="choose_text">Укажите пол</p>
      <div className="choose_boxes"></div>
    </div>
  );
};

export default ChooseGender;
