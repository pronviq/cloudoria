import React, { useEffect, useState } from "react";
import Login from "../components/authorization/Login";
import "./AuthPage.scss";
import Registration from "../components/authorization/Registration";

const LoginPage: React.FC = () => {
  const [rotate, setRotate] = useState<number>(0);

  return (
    <div className="loginpage">
      <div className="form_container" style={{ transform: `rotateY(${rotate}deg)` }}>
        <Login setRotate={setRotate} />
        <Registration setRotate={setRotate} />
      </div>
    </div>
  );
};

export default LoginPage;
