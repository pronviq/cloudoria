import React, { KeyboardEvent, ReactNode, RefObject } from "react";
import "./MyInput.scss";

interface IMyInput {
  value: string;
  onChange: (value: string) => void;
  error?: string | boolean;
  children?: ReactNode;
  type: "text" | "password";
  placeholder?: string;
  reference?: RefObject<HTMLInputElement>;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const MyInput: React.FC<IMyInput> = ({
  value,
  onChange,
  error,
  children,
  type,
  placeholder,
  reference,
  onKeyDown,
  className,
}) => {
  const warningColor = "rgba(255, 0, 0, 0.7)";

  return (
    <div className="myinput">
      <input
        ref={reference}
        onKeyDown={onKeyDown}
        maxLength={40}
        style={{ borderColor: error ? warningColor : "" }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={"myinput_field" + (className ? ` ${className}` : "")}
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
