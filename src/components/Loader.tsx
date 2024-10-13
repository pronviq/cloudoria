import React from "react";
import "./Loader.scss";

export const SpinnerLoader: React.FC = () => {
  return (
    <div className="loader_container">
      <div className="spinner_loader" />
    </div>
  );
};
