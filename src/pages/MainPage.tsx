import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import Main from "../components/Main";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/redux";
import { AuthResponse } from "../models/AuthResponse";
import { AxiosError, AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { setUser } from "../redux/userSlice";

import { useTheme } from "../components/contexts/theme/Theme.context";
import NavBar from "../components/ui/NavBar";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { theme } = useTheme();

  async function checkAuth() {
    setIsLoaded(false);
    // await new Promise((res) => setTimeout(res, 1000)); // just to have it

    await AuthService.refresh()
      .then((response: AxiosResponse<AuthResponse>) => {
        const user: IUser = {
          id: response.data?.id,
          username: response.data?.username,
          email: response.data?.email,
          disk_space: response.data?.disk_space,
          used_space: response.data?.used_space,
          gender: response.data?.gender,
        };
        // console.log(response.data);

        localStorage.setItem("token", response.data.access);
        dispatch(setUser(user));
      })
      .catch((error: AxiosError) => {
        // navigate("/auth");
        setIsLoaded(true);
      })
      .finally(() => setIsLoaded(true));
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isLoaded) {
    return (
      <div className="mainpage_forloader">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="mainpage">
      <div className="container">
        <div className="content">
          <NavBar />
          <Main />
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default MainPage;
