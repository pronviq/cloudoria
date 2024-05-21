import React, { MouseEvent, useState } from "react";
import "./Login.scss";
import AuthService from "../../services/AuthService";
import StringValidator from "../../utils/StringValidator";
import { useNavigate } from "react-router-dom";
import "./Registration.scss";
import ChooseGender from "./ChooseGender";
import { AxiosError, AxiosResponse } from "axios";
import { AuthResponse } from "../../models/Auth.model";
import { IUser } from "../../models/User.model";
import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../redux/userSlice";
import CloudSvg from "../../images/CloudSvg";
import UserService from "../../services/UserService";

interface IRegistration {
  setRotate: (n: number) => void;
}

const Registration: React.FC<IRegistration> = ({ setRotate }) => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const warningColor = "rgba(255, 0, 0, 0.7)";

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function registration(e: MouseEvent) {
    e.preventDefault();

    // if (!validateData()) {
    //   return;
    // }

    AuthService.registration(email, username, password, gender)
      .then((response: AxiosResponse<AuthResponse>) => {
        const user = UserService.responseToUser(response);
        dispatch(setUser(user));
        localStorage.setItem("token", response.data?.access);
        navigate("/");
      })
      .catch((error: AxiosError) => {
        setEmailError(error.response?.data as string);
      });
  }

  return (
    <article className="registration">
      <div className="login_title">
        <CloudSvg />
        <h1 className="title_text">CloudStorage</h1>
      </div>
      <form action="" className="registration_form">
        <div className="email_cont">
          <input
            maxLength={40}
            style={{ borderColor: usernameError ? warningColor : "" }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError("");
            }}
            className="login_input"
            type="text"
            placeholder="username"
          />
          <p
            style={{ "--warningColor": warningColor } as React.CSSProperties}
            className="auth_error"
          >
            {usernameError}
          </p>
        </div>
        <div className="email_cont">
          <input
            maxLength={40}
            style={{ borderColor: emailError ? warningColor : "" }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError("");
            }}
            className="login_input"
            type="text"
            placeholder="e-mail"
          />
          <p
            style={{ "--warningColor": warningColor } as React.CSSProperties}
            className="auth_error"
          >
            {emailError}
          </p>
        </div>
        <div className="password_cont">
          <input
            maxLength={40}
            style={{ borderColor: passwordError ? warningColor : "" }}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
            className="login_input"
            type="password"
            placeholder="password"
          />
          <p
            style={{ "--warningColor": warningColor } as React.CSSProperties}
            className="auth_error"
          >
            {passwordError}
          </p>
        </div>
        <ChooseGender gender={gender} setGender={setGender} />
        <button onClick={registration} className={"login_confirm"}>
          Зарегистрироваться
        </button>
      </form>
      <button onClick={() => setRotate(0)} className="switch_button">
        Вход
      </button>
    </article>
  );
};

export default Registration;
