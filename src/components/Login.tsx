import React, { MouseEvent, useEffect, useRef, useState } from "react";
import "./Login.scss";
import AuthService from "../services/AuthService";
import StringValidator from "../utils/StringValidator";
import useDebounce from "../hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
import CloudSvg from "../images/CloudSvg";

interface ILogin {
  setRotate: (n: number) => void;
}

const Login: React.FC<ILogin> = ({ setRotate }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bothError, setBothError] = useState<string>("");
  const navigate = useNavigate();

  const warningColor = "rgba(255, 0, 0, 0.7)";

  async function login(e: MouseEvent) {
    e.preventDefault();

    await AuthService.login(email, password)
      .then((response: AxiosResponse<AuthResponse>) => {
        localStorage.setItem("token", response.data?.access);
        navigate("/");
      })
      .catch((error: AxiosError) => {
        setBothError(error.response?.data as string);
      });
  }

  return (
    <article className="login">
      <div className="login_title">
        <CloudSvg />
        <h1 className="title_text">CloudStorage</h1>
      </div>
      <form action="" className="login_form">
        <input
          style={{ borderColor: bothError ? warningColor : "" }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setBothError("");
          }}
          className="login_input"
          type="text"
          placeholder="e-mail or username"
        />

        <input
          style={{ borderColor: bothError ? warningColor : "" }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setBothError("");
          }}
          className="login_input"
          type="password"
          placeholder="password"
        />
        <p style={{ "--warningColor": warningColor } as React.CSSProperties} className="auth_error">
          {bothError}
        </p>

        <button onClick={login} className={"login_confirm"}>
          Войти
        </button>
      </form>
      <button onClick={() => setRotate(180)} className="switch_button">
        Регистрация
      </button>
      <button className="forgot_password">Забыли пароль?</button>
    </article>
  );
};

export default Login;
