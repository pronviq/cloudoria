import { Link, useNavigate } from "react-router-dom";
import CloudSvg from "../../images/CloudSvg";
import UserAddSvg from "../../images/UserAddSvg";
import "./Header.scss";
import { startTransition } from "react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="loginpage_header">
      <Link to={"/"} className="loginpage_header-logo">
        <CloudSvg height="40px" />
        Cloudoria
      </Link>
      <div className="loginpage_header-toreg">
        Нет аккаунта?
        <Link
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            startTransition(() => navigate("/registration"));
          }}
          to={"/registration"}
        >
          Регистрация
          <UserAddSvg marginLeft="2px" height="18px" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
