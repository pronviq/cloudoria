import React from "react";
import "./InputField.scss";

interface IInputField {
  onClick?: () => void;
  title: string;
  type: "text" | "password";
  error?: string | boolean;
}

// &rarr;
// &times;
// &#10004;

const InputField: React.FC<IInputField> = ({ onClick, title, type, error }) => {
  return (
    <div className="inputfield">
      <div className="inputfield_title">{title}</div>
      <div className="inputfield_content">
        <div className="inputfield_content-status">&#10004;</div>
        <input type={type} className="inputfield_content-input" />
      </div>
      <div className="inputfield_error">{error}</div>
    </div>
  );
};

export default InputField;
