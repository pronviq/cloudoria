import React, { MouseEvent, useState } from "react";
import "./Login.scss";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { AuthResponse } from "../models/AuthResponse";
import { useAppDispatch } from "../hooks/redux";
import { setUser } from "../redux/userSlice";
import { IUser } from "../models/IUser";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [bothError, setBothError] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function login(e: MouseEvent) {
    e.preventDefault();

    await AuthService.login(email, password)
      .then((response: AxiosResponse<AuthResponse>) => {
        const user: IUser = {
          id: response.data?.id,
          username: response.data?.username,
          email: response.data?.email,
          disk_space: response.data?.disk_space,
          used_space: response.data?.used_space,
          gender: response.data?.gender,
        };

        localStorage.setItem("token", response.data?.access);
        dispatch(setUser(user));
        navigate("/");
      })
      .catch((error: AxiosError) => {
        setBothError(error.response?.data as string);
      });
  }

  return (
    <article className="login">
      <div className="login_title">
        <div className="title_cloud" />
        <h1 className="title_text">CloudStorage</h1>
      </div>
      <form action="" className="login_form">
        <div className="email_cont">
          <input
            style={{ borderColor: bothError ? "red" : "black" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setBothError("");
            }}
            className="login_input"
            type="text"
            placeholder="e-mail or username"
          />
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
