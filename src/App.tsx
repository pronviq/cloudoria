import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import "./styles/App.scss";
import Settings from "./pages/Settings";
import MainPage from "./pages/MainPage";

const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<AuthPage />} path="/auth" />
          <Route element={<Settings />} path="/settings" />
          <Route element={<MainPage />} path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
