import React from "react";
import "./Login.scss";
import Background from "./Background";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

const LoginPage: React.FC = () => {
  return (
    <div className="loginpage">
      <Background />
      <div className="loginpage_container">
        <Header type="login" />
        <Main />
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
