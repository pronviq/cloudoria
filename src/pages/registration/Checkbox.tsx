import React, { useEffect, useState } from "react";
import "./Checkbox.scss";
import CheckmarkSvg from "../../images/CheckmarkSvg";

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
      <span style={{ opacity: value ? "1" : "" }} className="checkbox">
        {value && <CheckmarkSvg />}
      </span>
      <p style={{ opacity: value ? "1" : "" }} className="checkbox_text">
        {text}
      </p>
    </div>
  );
};

export default Checkbox;
