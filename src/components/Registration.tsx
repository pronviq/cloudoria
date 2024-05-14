import React, { MouseEvent, useEffect, useRef, useState } from "react";
import "./Login.scss";
import AuthService from "../services/AuthService";
import StringValidator from "../utils/StringValidator";
import { useNavigate } from "react-router-dom";
import "./Registration.scss";
import Checkbox from "./ui/Checkbox";
import ChooseGender from "./ui/ChooseGender";

const Registration: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [registrationPossible, setRegistrationPossible] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("");

  const navigate = useNavigate();

  async function registration(e: MouseEvent) {
    e.preventDefault();
    if (!registrationPossible) {
      return;
    }

    try {
      const response = await AuthService.registration(email, password, gender);
      if (response.status === 200) {
        localStorage.setItem("token", response.data?.access);
        navigate("/");
      }
    } catch (error: any) {
      const message = error.response.data.message;
      const spliced = message.slice(0, 21);
      console.log(spliced);

      if (spliced === "Пользователь с почтой") {
        setEmailError("Почта занята");
      } else {
        setEmailError(error.response.data.message);
      }
    }
  }

  const handleEmail = (Email: string): void => {
    setEmail(Email);
    setRegistrationPossible(false);
    setEmailError("");
    if (Email.length) {
      if (StringValidator.isEmail(Email)) {
        setEmailError("");
      } else {
        setEmailError("Некорректная почта");
      }
    }
  };

  const handlePassword = (Password: string): void => {
    setPassword(Password);
    setPasswordError("");
    setRegistrationPossible(false);
    if (Password.length) {
      if (Password.length < 6) {
        setPasswordError("Слишком короткий пароль");
      } else if (Password.length > 32) {
        setPasswordError("Слишком длинный пароль");
      }
    }
  };

  function checkPossible() {
    if (!emailError && !passwordError && password.length && email.length && gender.length) {
      setRegistrationPossible(true);
    } else {
      setRegistrationPossible(false);
    }
  }

  useEffect(checkPossible, [email, password, gender]);

  return (
    <article className="registration">
      <div className="login_title">
        <div className="title_cloud" />
        <h1 className="title_text">CloudStorage</h1>
      </div>
      <form action="" className="login_form">
        <div className="email_cont">
          <input
            style={{ borderColor: emailError ? "red" : "black" }}
            value={email}
            onChange={(e) => handleEmail(e.target.value)}
            className="login_input"
            type="text"
            placeholder="E-mail"
          />
          <p className="auth_error">{emailError}</p>
        </div>
        <div className="password_cont">
          <input
            style={{ borderColor: passwordError ? "red" : "black" }}
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
            className="login_input"
            type="password"
            placeholder="Пароль"
          />
          <p className="auth_error">{passwordError}</p>
        </div>
        <ChooseGender gender={gender} setGender={setGender} />
        <button
          onClick={registration}
          className={"login_confirm" + (registrationPossible ? "" : " unactive")}
        >
          Зарегистрироваться
        </button>
      </form>
      <button
        onClick={() => {
          const form_container = document.querySelector(".form_container") as HTMLElement;
          if (form_container) {
            form_container.style.transform = "rotateY(0deg)";
          }
        }}
        className="switch_button"
      >
        Вход
      </button>
      <button className="forgot_password">Забыли пароль?</button>
    </article>
  );
};

export default Registration;
