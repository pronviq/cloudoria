import React, { ReactNode } from "react";
import "./MyInput.scss";

interface IMyInput {
  value: string;
  onChange: (value: string) => void;
  error?: string | boolean;
  children?: ReactNode;
  type: "text" | "password";
  placeholder?: string;
}

const MyInput: React.FC<IMyInput> = ({ value, onChange, error, children, type, placeholder }) => {
  const warningColor = "rgba(255, 0, 0, 0.7)";

  return (
    <div className="myinput">
      <input
        maxLength={40}
        style={{ borderColor: error ? warningColor : "" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="myinput_field"
        type={type}
        placeholder={placeholder}
      />
      <p style={{ color: warningColor }} className="myinput_error">
        {error !== true && error}
      </p>
      {children}
    </div>
  );
};

export default MyInput;
