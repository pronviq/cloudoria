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
import NotFound from "./pages/404";
import "./styles/Simplebar.scss";
import UserService from "./services/UserService";
import { setCurrentDir } from "./redux/fileSlice";
import Files from "./components/files/Files";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const Settings = lazy(() => import("./pages/Settings"));
const MainPage = lazy(() => import("./pages/MainPage"));

const App: React.FC = () => {
  const { theme, setCurrentTheme } = useTheme();
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  const { isLoading } = useQuery({
    queryFn: checkAuth,
    refetchOnWindowFocus: false,
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
            <Route element={<Redirect to="/" />} path="/auth" />
            <Route element={<Settings />} path="/settings" />
            <Route element={<MainPage />} path="/">
              <Route element={<Files />} path="/favorites" />
              <Route element={<Files />} path="/trash" />
              <Route element={<Files />} path="/search" />
              <Route element={<Files />} path="/" />
            </Route>
            <Route element={<NotFound />} path="*" />
          </Routes>
        ) : (
          <Routes>
            <Route element={<AuthPage />} path="/auth" />
            {/* <Route element={<MainPage />} path="/" /> */}
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
