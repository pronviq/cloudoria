import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import "./AuthPage.scss";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import Registration from "../components/Registration";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  async function checkAuth() {
    try {
      setIsLoaded(false);
      await new Promise((res) => setTimeout(res, 1000));
      const response = await AuthService.refresh();
      if (response.status === 200) {
        localStorage.setItem("token", response.data.access);
        navigate("/");
      }
    } catch (error: any) {
      setIsLoaded(true);
    } finally {
      setIsLoaded(true);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isLoaded) {
    return (
      <div className="loginpage">
        <div className="form_container">
          <div className="loader" />
        </div>
      </div>
    );
  }

  return (
    <div className="loginpage">
      <div className="form_container">
        <Login />
        <Registration />
      </div>
    </div>
  );
};

export default LoginPage;
