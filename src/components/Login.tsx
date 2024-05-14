import React, { MouseEvent, useEffect, useRef, useState } from "react";
import "./Login.scss";
import AuthService from "../services/AuthService";
import StringValidator from "../utils/StringValidator";
import useDebounce from "../hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";
import useFetching from "../hooks/useFetching";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bothError, setBothError] = useState<string>("");
  const [loginPossible, setLoginPossible] = useState<boolean>(false);
  const debouncedEmailChecker = useDebounce(500, checkEmail);
  const navigate = useNavigate();

  async function login(e: MouseEvent) {
    e.preventDefault();
    if (!loginPossible) {
      return;
    }

    try {
      const response = await AuthService.login(email, password);
      if (response.status === 200) {
        localStorage.setItem("token", response.data?.access);
        navigate("/");
      }
    } catch (error: any) {
      setBothError(error.response.data.message);
    }
  }

  function checkEmail() {
    const isCorrect = StringValidator.isEmail(email);

    if (!isCorrect && email.length) {
      setEmailError("Некорректная почта");
      setLoginPossible(false);
    } else if (isCorrect && password.length && email.length) {
      setLoginPossible(true);
    }
  }

  useEffect(() => {
    debouncedEmailChecker();
  }, [email, password]);

  return (
    <article className="login">
      <div className="login_title">
        <div className="title_cloud" />
        <h1 className="title_text">CloudStorage</h1>
      </div>
      <form action="" className="login_form">
        <div className="email_cont">
          <input
            style={{ borderColor: bothError || emailError ? "red" : "black" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
              setBothError("");
              setLoginPossible(false);
            }}
            className="login_input"
            type="text"
            placeholder="E-mail"
          />
          <p className="auth_error">{emailError}</p>
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
            placeholder="Пароль"
          />
          <p className="auth_error">{bothError}</p>
        </div>

        <button
          onClick={login}
          className={"login_confirm" + (loginPossible && password.length ? "" : " unactive")}
        >
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
