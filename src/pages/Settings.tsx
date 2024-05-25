import React from "react";
import "./Settings.scss";
import Sessions from "../components/settings/Sessions";

const Settings: React.FC = () => {
  return (
    <div className="settings">
      <Sessions />
    </div>
  );
};

export default Settings;
