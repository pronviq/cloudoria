import React from "react";
import "./Loader.scss";

const Loader: React.FC = () => {
  return (
    <div className="loader_container">
      <div className="loader" />
    </div>
  );
};

export default Loader;

export const FilesLoader: React.FC = () => {
  return (
    <div className="loader_container">
      <div className="files_loader" />
    </div>
  );
};

export const SpinnerLoader: React.FC = () => {
  return (
    <div className="loader_container">
      <div className="spinner_loader" />
    </div>
  );
};
