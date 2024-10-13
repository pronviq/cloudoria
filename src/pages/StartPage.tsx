import { Link, useNavigate } from "react-router-dom";
import CloudSvg from "../images/CloudSvg";
import Footer from "./login/Footer";
import "./StartPage.scss";
import MyButton from "../components/ui/MyElements/MyButton";
import { startTransition } from "react";
import DotsBackground from "./DotsBackground";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="startpage">
      <DotsBackground />
      <header className="startpage_header">
        <Link
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            startTransition(() => navigate("/"));
          }}
          to={"/"}
          className="startpage_header-logo"
        >
          <CloudSvg height="40px" />
          Cloudoria
        </Link>
        <div className="startpage_header-actions">
          <Link
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              startTransition(() => navigate("/login"));
            }}
            to={"/login"}
          >
            Вход
          </Link>
          <Link
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              startTransition(() => navigate("/registration"));
            }}
            to={"/registration"}
          >
            Регистрация
          </Link>
        </div>
      </header>
      <main className="startpage_main">
        <div className="startpage_main-greet">
          <h1 className="startpage_main-title">Добро пожаловать в Cloudoria!</h1>
          <p className="startpage_main-desc">Cloudoria - это сайт для хранения данных</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartPage;
