import { useEffect, useRef, useState } from "react";
import "./Main.scss";
import { SpinnerLoader } from "../../components/Loader";
import InputField from "../login/InputField";
import useDebounce from "../../hooks/useDebounce";
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import { AuthResponse } from "../../models/Auth.model";
import { setCurrentDir } from "../../redux/fileSlice";
import { setUser } from "../../redux/userSlice";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";
import ChooseGender from "./ChooseGender";
import MaleSvg from "../../images/MaleSvg";
import FemaleSvg from "../../images/FemaleSvg";

const Main = () => {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string | boolean>("");
  const [passError, setPassError] = useState<string | boolean>("");
  const [emailError, setEmailError] = useState<string | boolean>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [gender, setGender] = useState<string>("male");
  const [error, setError] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const debouncedPassCheck = useDebounce(500, (arr: string[]) => {
    const value = arr[0];
    if (!value) return;

    if (value.length < 6 || value.length > 32) {
      setPassError("Длина пароля должна быть от 6 до 32 символов");
    } else {
      setPassError(false);
    }
  });

  const debouncedUsernameCheck = useDebounce(500, (arr: string[]) => {
    const value = arr[0];
    const latinAlphabetRegex = /^[a-zA-Z]+$/;
    if (!value) return;

    if (value.length < 2 || value.length > 16) {
      setUsernameError("Длина никнейма должна быть от 2 до 16 символов");
    } else if (!latinAlphabetRegex.test(value)) {
      setUsernameError("Никнейм должен состоять только из символов латинского алфавита (a-z, A-Z)");
    } else {
      setUsernameError(false);
    }
  });

  const debouncedEmailCheck = useDebounce(500, (arr: string[]) => {
    const value = arr[0];
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value) return;

    if (value.length < 3 || value.length > 64 || !emailRegex.test(value)) {
      setEmailError("Некорректная почта");
    } else {
      setEmailError(false);
    }
  });

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const changePassword = (value: string) => {
    setPassError("");
    setPass(value);
    debouncedPassCheck(value);
  };

  const changeUsername = (value: string) => {
    setUsernameError("");
    setUsername(value);
    debouncedUsernameCheck(value);
  };

  const changeEmail = (value: string) => {
    setEmailError("");
    setEmail(value);
    debouncedEmailCheck(value);
  };

  const Registration = async () => {
    setLoading(true);
    await AuthService.registration(email, username, pass, gender)
      .then((response: AxiosResponse<AuthResponse>) => {
        const user = UserService.responseToUser(response);
        dispatch(setUser(user));
        dispatch(setCurrentDir(user.root_directory));
        localStorage.setItem("token", response.data?.access);
        navigate("/");
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        const err = (error.response?.data as string) || (error.message as string);
        if (err === "Почта занята") {
          setEmailError(err);
        } else if (err === "Такое имя уже занято") {
          setUsernameError(err);
        } else {
          setError(err);
        }
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsDone(true);
    }, 1200);
  }, []);

  useEffect(() => {
    emailRef.current?.focus();
  }, [isDone]);

  return (
    <main className="regpage_main">
      <div className="regpage_main-container">
        <div className="regpage_main-title">
          <p>Добро пожаловать!</p>
          <div />
        </div>
        {isDone && (
          <>
            <InputField
              reference={emailRef}
              value={email}
              onChange={changeEmail}
              error={emailError}
              type="text"
              title="Введите e-mail"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  usernameRef.current?.focus();
                }
              }}
            />
            <InputField
              reference={usernameRef}
              value={username}
              onChange={changeUsername}
              error={usernameError}
              type="text"
              title="Введите никнейм"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  passRef.current?.focus();
                }
              }}
            />
            <InputField
              reference={passRef}
              value={pass}
              onChange={changePassword}
              error={passError}
              type="password"
              title="Введите пароль"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  Registration();
                }
              }}
            />
            <div className="regpage_main-choosegender">
              <p>Укажите пол</p>
              <div>
                <button
                  onClick={() => setGender("male")}
                  style={{ opacity: gender === "male" ? 1 : 0.4 }}
                >
                  <MaleSvg height="100%" />
                  Мужской
                </button>
                <button
                  onClick={() => setGender("female")}
                  style={{ opacity: gender === "female" ? 1 : 0.4 }}
                >
                  <FemaleSvg height="100%" />
                  Женский
                </button>
              </div>
            </div>
            <div className="regpage_main-footer">
              <div className="regpage_main-loader">{isLoading && <SpinnerLoader />}</div>
              {usernameError === false && emailError === false && passError === false ? (
                <button onClick={Registration} className="regpage_main-confirm">
                  Зарегистрироваться
                </button>
              ) : (
                <div className="regpage_main-noconfirm">Зарегистрироваться</div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="loginpage_main-error">{error}</div>
    </main>
  );
};

export default Main;
