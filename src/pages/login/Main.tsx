import { useState } from "react";
import "./Main.scss";
import InputField from "./InputField";

const Main = () => {
  const [step, setStep] = useState<number>(1);
  // 1: Активный интерфейс от него отталкивается ошибка
  // 2: Три состояния под поля ввода
  return (
    <main className="loginpage_main">
      <div className="loginpage_main-container">
        <div className="loginpage_main-title">
          <p>Добро пожаловать!</p>
          <div />
        </div>
        <div className="loginpage_main-field">
          <InputField type="text" title="Введите имя или e-mail" />
          <button>Далее</button>
        </div>
        <div className="loginpage_main-field">
          <InputField type="password" title="Введите пароль" />
          <button>Далее</button>
        </div>
      </div>
    </main>
  );
};

export default Main;
