import React, { MouseEvent, useEffect, useRef, useState } from "react";
import "./Login.scss";
import AuthService from "../../services/AuthService";
import StringValidator from "../../utils/StringValidator";
import useDebounce from "../../hooks/useDebounce";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { AuthResponse } from "../../models/Auth.model";
import CloudSvg from "../../images/CloudSvg";
import { IUser } from "../../models/User.model";
import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../redux/userSlice";
import UserService from "../../services/UserService";
import EyeOpenSvg from "../../images/EyeOpenSvg";
import EyeClosedSvg from "../../images/EyeClosedSvg";
import MyInput from "../ui/MyElements/MyInput";
import MyButton from "../ui/MyElements/MyButton";

interface ILogin {
  setRotate: (n: number) => void;
}

const Login: React.FC<ILogin> = ({ setRotate }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bothError, setBothError] = useState<string>("");
  const [isVisible, setVisible] = useState<boolean>(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function login() {
    await AuthService.login(email, password)
      .then((response: AxiosResponse<AuthResponse>) => {
        const user = UserService.responseToUser(response);
        dispatch(setUser(user));
        localStorage.setItem("token", response.data?.access);

        navigate("/");
      })
      .catch((error: AxiosError) => {
        setBothError(error.response?.data as string);
      });
  }

  return (
    <article className="login">
      <div className="auth_title">
        <CloudSvg />
        <h1 className="title_text">CloudStorage</h1>
      </div>
      <form action="" className="auth_form">
        <MyInput
          reference={usernameRef}
          value={email}
          onChange={(val) => {
            setEmail(val);
            setBothError("");
          }}
          error={bothError ? true : false}
          type="text"
          placeholder="e-mail or username"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              passwordRef.current?.focus();
            }
          }}
        />

        <MyInput
          reference={passwordRef}
          value={password}
          onChange={(val) => {
            setPassword(val);
            setBothError("");
          }}
          error={bothError}
          type={isVisible ? "text" : "password"}
          placeholder="password"
          children={
            <button
              onClick={(e) => {
                e.preventDefault();
                setVisible((prev) => !prev);
              }}
              className="password_eye"
            >
              {isVisible ? <EyeOpenSvg /> : <EyeClosedSvg />}
            </button>
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              login();
            }
          }}
        />

        <div className="login_buttons">
          <MyButton
            text="Войти"
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          />
          <MyButton
            text="Регистрация"
            onClick={(e) => {
              e.preventDefault();
              setRotate(180);
            }}
          />
        </div>
      </form>
      <button className="forgot_password">Забыли пароль?</button>
    </article>
  );
};

export default Login;
