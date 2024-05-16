import React, { MouseEvent, useEffect, useRef, useState } from "react";
import "./Login.scss";
import AuthService from "../services/AuthService";
import StringValidator from "../utils/StringValidator";
import useDebounce from "../hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
import CloudSvg from "../images/CloudSvg";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bothError, setBothError] = useState<string>("");
  // const [loginPossible, setLoginPossible] = useState<boolean>(false);
  const navigate = useNavigate();

  async function login(e: MouseEvent) {
    e.preventDefault();
    // if (!loginPossible) {
    //   return;
    // }

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
        <div className="email_cont">
          <input
            style={{ borderColor: bothError ? "red" : "black" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              // setEmailError("");
              setBothError("");
              // setLoginPossible(false);
            }}
            className="login_input"
            type="text"
            placeholder="e-mail or username"
          />
          {/* <p className="auth_error">{emailError}</p> */}
        </div>
        <div className="password_cont">
          <input
            style={{ borderColor: bothError ? "red" : "black" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setBothError("");
            }}
            className="login_input"
            type="password"
            placeholder="password"
          />
          <p className="auth_error">{bothError}</p>
        </div>

        <button onClick={login} className={"login_confirm"}>
          Войти
        </button>
      </form>
      <button
        onClick={() => {
          const form_container = document.querySelector(".form_container") as HTMLElement;
          if (form_container) {
            form_container.style.transform = "rotateY(180deg)";
          }
        }}
        className="switch_button"
      >
        Регистрация
      </button>
      <button className="forgot_password">Забыли пароль?</button>
    </article>
  );
};

export default Login;
