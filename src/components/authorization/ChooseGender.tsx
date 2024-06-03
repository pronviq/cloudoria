import React, { useState } from "react";
import "./ChooseGender.scss";
import Checkbox from "./Checkbox";

interface IChooseGender {
  gender: string;
  setGender: (gender: string) => void;
}

const ChooseGender: React.FC<IChooseGender> = ({ gender, setGender }) => {
  const [isMale, setMale] = useState(gender === "male");
  const [isFemale, setFemale] = useState(gender === "female");

  return (
    <div className="choose_gender">
      <p className="choose_text"> Пол </p>
      <div className="choose_boxes">
        <Checkbox
          text="Мужской"
          value={isMale}
          setValue={() => {
            setMale(true);
            setGender("male");
            setFemale(false);
          }}
        />
        <Checkbox
          text="Женский"
          value={isFemale}
          setValue={() => {
            setFemale(true);
            setGender("female");
            setMale(false);
          }}
        />
      </div>
    </div>
  );
};

export default ChooseGender;
