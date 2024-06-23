import React, { KeyboardEvent, RefObject, useState } from "react";
import "./InputField.scss";
import EyeClosedSvg from "../../images/EyeClosedSvg";
import EyeOpenSvg from "../../images/EyeOpenSvg";

interface IInputField {
  title: string;
  type: "text" | "password";
  error?: string | boolean | null;
  onChange: (value: string) => void;
  value?: string;
  reference?: RefObject<HTMLInputElement>;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
}

// &rarr;
// &times;
// &#10004;
// cubes for bg

const InputField: React.FC<IInputField> = ({
  title,
  type,
  error,
  onKeyDown,
  onChange,
  value,
  reference,
  className,
  placeholder,
}) => {
  const [isPassword, setIsPassword] = useState<boolean>(type === "password");

  return (
    <div className="inputfield">
      <div className="inputfield_title">{title}</div>
      <div className="inputfield_content">
        <div className="inputfield_content-status">
          {error === false ? (
            <span style={{ color: "lime", fontSize: "16px" }}>&#10004;</span>
          ) : error ? (
            <span style={{ color: "red", fontSize: "24px" }}>&times;</span>
          ) : (
            <span style={{ color: "violet", fontSize: "14px" }}>&rarr;</span>
          )}
        </div>
        <div className="inputfield_content-row">
          <input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            ref={reference}
            onKeyDown={onKeyDown}
            style={{
              borderColor: error ? "red" : error === false ? "lime" : "white",
              color: error ? "red" : error === false ? "lime" : "white",
            }}
            type={isPassword ? "password" : "text"}
            className={"inputfield_content-input" + (className ? ` ${className}` : "")}
          />
          {type === "password" ? (
            <button onClick={() => setIsPassword((p) => !p)} className="inputfield_content-eye">
              {isPassword && <EyeClosedSvg />}
              {!isPassword && <EyeOpenSvg />}
            </button>
          ) : null}
        </div>
      </div>
      <div className="inputfield_error">{error}</div>
    </div>
  );
};

export default InputField;
