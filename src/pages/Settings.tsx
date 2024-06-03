import React from "react";
import "./Settings.scss";
import Sessions from "../components/settings/Sessions";
import Safety from "../components/settings/Safety";
import SimpleBar from "simplebar-react";

const Settings: React.FC = () => {
  return (
    <div className="settings">
      <SimpleBar style={{ height: "100%" }}>
        <Safety />
        <Sessions />
      </SimpleBar>
    </div>
  );
};

export default Settings;
