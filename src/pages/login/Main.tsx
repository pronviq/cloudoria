import { RefObject, useEffect, useRef, useState } from "react";
import "./Main.scss";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import AuthService from "../../services/AuthService";
import { AxiosResponse, AxiosError } from "axios";
import { AuthResponse } from "../../models/Auth.model";
import { setCurrentDir } from "../../redux/fileSlice";
import { setUser } from "../../redux/userSlice";
import UserService from "../../services/UserService";
import { SpinnerLoader } from "../../components/Loader";

const Main = () => {
  const [login, setLogin] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [bothError, setBothError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function Login() {
    setLoading(true);
    await AuthService.login(login, pass)
      .then((response: AxiosResponse<AuthResponse>) => {
        const user = UserService.responseToUser(response);
        dispatch(setUser(user));
        dispatch(setCurrentDir(user.root_directory));
        localStorage.setItem("token", response.data?.access);

        navigate("/");
      })
      .catch((error: AxiosError) => {
        console.log(error.response);

        const err = (error.response?.data as string) || (error.message as string);
        if (err === "Неверное имя или пароль") {
          setBothError(err);
        } else {
          setError(err);
        }
        setLoading(false);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      setIsDone(true);
    }, 1200);
  }, []);

  useEffect(() => {
    loginRef.current?.focus();
  }, [isDone]);

  return (
    <main className="loginpage_main">
      <div className="loginpage_main-container">
        <div className="loginpage_main-title">
          <p>С возвращением!</p>
          <div />
        </div>
        {isDone && (
          <>
            <InputField
              reference={loginRef}
              value={login}
              onChange={(val) => {
                setBothError("");
                setLogin(val);
              }}
              error={bothError ? true : ""}
              type="text"
              title="Введите имя или e-mail"
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
              onChange={(val) => {
                setBothError("");
                setPass(val);
              }}
              error={bothError}
              type="password"
              title="Введите пароль"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  Login();
                }
              }}
            />
            <div className="loginpage_main-footer">
              <div className="loginpage_main-loader">{isLoading && <SpinnerLoader />}</div>
              <button onClick={Login} className="loginpage_main-confirm">
                Войти
              </button>
            </div>
          </>
        )}
      </div>
      <div className="loginpage_main-error">{error}</div>
    </main>
  );
};

export default Main;
