import React, { useEffect, useState } from "react";
import "./Checkbox.scss";

interface ICheckbox {
  value: boolean;
  setValue: (v: boolean) => void;
  text: string;
}

const Checkbox: React.FC<ICheckbox> = ({ value, setValue, text }) => {
  return (
    <div
      className="checkbox_cont"
      onClick={() => {
        setValue(!value);
      }}
    >
      <span className={"checkbox" + (value ? " active" : "")}></span>
      <p className="checkbox_text">{text}</p>
    </div>
  );
};

export default Checkbox;
