import Background from "../login/Background";
import Footer from "../login/Footer";
import Header from "../login/Header";
import Main from "./Main";
import "./Registration.scss";

const Registration = () => {
  return (
    <div className="loginpage">
      <Background />
      <div className="loginpage_container">
        <Header type="registration" />
        <Main />
        <Footer />
      </div>
    </div>
  );
};

export default Registration;
