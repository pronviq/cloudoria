import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/App.scss";
import MainPage from "./pages/MainPage";
import { Provider } from "react-redux";
import store from "./redux/store";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const Settings = lazy(() => import("./pages/Settings"));

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
