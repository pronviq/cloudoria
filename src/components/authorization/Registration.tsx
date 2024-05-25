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
import MyInput from "../ui/MyInput";
import EyeOpenSvg from "../../images/EyeOpenSvg";
import EyeClosedSvg from "../../images/EyeClosedSvg";
import MyButton from "../ui/MyButton";

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
  const [isVisible, setVisible] = useState<boolean>(false);

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
      <div className="auth_title">
        <CloudSvg />
        <h1 className="title_text">CloudStorage</h1>
      </div>
      <form action="" className="auth_form">
        <div className="email_cont">
          <MyInput
            value={username}
            onChange={(val) => {
              setUsername(val);
              setUsernameError("");
            }}
            error={usernameError}
            type="text"
            placeholder="username"
          />
        </div>
        <MyInput
          value={email}
          onChange={(val) => {
            setEmail(val);
            setEmailError("");
          }}
          error={emailError}
          type="text"
          placeholder="e-mail"
        />
        <MyInput
          value={password}
          onChange={(val) => {
            setPassword(val);
            setPasswordError("");
          }}
          error={passwordError}
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
        />
        <ChooseGender gender={gender} setGender={setGender} />
        <div className="registration_buttons">
          <MyButton text="Зарегистрироваться" onClick={registration} />
          <MyButton
            text="Вход"
            onClick={(e) => {
              e.preventDefault();
              setRotate(0);
            }}
          />
        </div>
      </form>
    </article>
  );
};

export default Registration;
