import React from "react";
import "./MyButton.scss";

interface IMyButton {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const MyButton: React.FC<IMyButton> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="mybutton">
      {text}
      <div className="mybutton_border" />
    </button>
  );
};

export default MyButton;
