import React, { useRef, useState } from "react";
import "./Login.scss";
import AuthService from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import "./Registration.scss";
import ChooseGender from "./ChooseGender";
import { AxiosError, AxiosResponse } from "axios";
import { AuthResponse } from "../../models/Auth.model";
import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../redux/userSlice";
import UserService from "../../services/UserService";
import MyInput from "../ui/MyElements/MyInput";
import EyeOpenSvg from "../../images/EyeOpenSvg";
import EyeClosedSvg from "../../images/EyeClosedSvg";
import MyButton from "../ui/MyElements/MyButton";
import Title from "../ui/navbar/Title";

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
  const [gender, setGender] = useState<string>("male");
  const [isVisible, setVisible] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function registration() {
    const { emailErr, passwordErr, usernameErr } = AuthService.validateReg(
      email,
      password,
      username
    );

    if (emailErr) setEmailError(emailErr);
    if (usernameErr) setUsernameError(usernameErr);
    if (passwordErr) setPasswordError(passwordErr);

    if (emailErr || usernameErr || passwordErr) return;

    await AuthService.registration(email, username, password, gender)
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
      <Title />
      <form action="" className="auth_form">
        <div className="email_cont">
          <MyInput
            reference={usernameRef}
            value={username}
            onChange={(val) => {
              setUsername(val);
              setUsernameError("");
            }}
            error={usernameError}
            type="text"
            placeholder="username"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                emailRef.current?.focus();
              }
            }}
          />
        </div>
        <MyInput
          reference={emailRef}
          value={email}
          onChange={(val) => {
            setEmail(val);
            setEmailError("");
          }}
          error={emailError}
          type="text"
          placeholder="e-mail"
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
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        />
        <ChooseGender gender={gender} setGender={setGender} />
        <div className="registration_buttons">
          <MyButton
            text="Зарегистрироваться"
            onClick={(e) => {
              e.preventDefault();
              registration();
            }}
          />
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
