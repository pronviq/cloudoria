import React, { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import { Provider } from "react-redux";
import store from "./redux/store";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const Settings = lazy(() => import("./pages/Settings"));
const MainPage = lazy(() => import("./pages/MainPage"));

const App: React.FC = () => {
  return (
    <div className="app">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthPage />} path="/auth" />
            <Route element={<Settings />} path="/settings" />
            <Route element={<MainPage />} path="/" />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
