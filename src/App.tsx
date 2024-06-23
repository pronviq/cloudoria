import React, { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./styles/App.scss";
import { useQuery } from "react-query";
import { useTheme } from "./contexts/theme/Theme.context";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import AuthService from "./services/AuthService";
import { AxiosResponse } from "axios";
import { AuthResponse } from "./models/Auth.model";
import { initialState, setUser } from "./redux/userSlice";
import Loader from "./components/Loader";
import "./styles/Simplebar.scss";
import UserService from "./services/UserService";
import { setCurrentDir } from "./redux/fileSlice";

// import Files from "./components/files/Files";
// import AuthPage from "./pages/AuthPage";
// import MainPage from "./pages/MainPage";
// import Settings from "./pages/Settings";
// import Login from "./pages/Login";
// import RegPage from "./pages/RegPage";

const Files = lazy(() => import("./components/files/Files"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const MainPage = lazy(() => import("./pages/MainPage"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/login/Login"));
const RegPage = lazy(() => import("./pages/RegPage"));

const App: React.FC = () => {
  const { theme, setCurrentTheme } = useTheme();
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const { isLoading } = useQuery({
    queryFn: checkAuth,
    refetchOnWindowFocus: true,
  });

  async function checkAuth() {
    await AuthService.refresh()
      .then((response: AxiosResponse<AuthResponse>) => {
        const user = UserService.responseToUser(response);
        localStorage.setItem("token", response.data.access);

        dispatch(setUser(user));
        setCurrentTheme(user.theme);
        dispatch(setCurrentDir(user.root_directory));
      })
      .catch(() => {
        dispatch(setUser(initialState));
      });
  }

  if (isLoading)
    return (
      <div style={{ ...(theme as React.CSSProperties) }} className="app">
        <Loader />
      </div>
    );

  return (
    <div style={{ ...(theme as React.CSSProperties) }} className="app">
      <BrowserRouter>
        {user.isAuth ? (
          <Routes>
            {/* <Route element={<AuthPage />} path="/auth" /> */}
            <Route element={<MainPage />} path="/">
              <Route element={<Settings />} path="/settings" />
              <Route element={<Files />} path="/favorites" />
              <Route element={<Files />} path="/trash" />
              <Route element={<Files />} path="/search" />
              <Route element={<Files />} path="/" />
            </Route>
            <Route element={<Redirect to="/" />} path="/*" />
          </Routes>
        ) : (
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<RegPage />} path="/registration" />

            <Route element={<AuthPage />} path="/auth" />
            <Route element={<Redirect to="/auth" />} path="*" />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;

interface RedirectProps {
  to: string;
}

export const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return <></>;
};
