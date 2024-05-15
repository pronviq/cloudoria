import React from "react";
import "./FreeSpace.scss";
import { useAppSelector } from "../hooks/redux";

const FreeSpace: React.FC = () => {
  const { disk_space, used_space } = useAppSelector((state) => state.userReducer);
  const totalSpaceMB = Math.floor((disk_space / 1024) * 10) / 10;
  const usedSpaceMB = Math.floor((used_space / 1024) * 10) / 10;
  const usedSpacePercent = (100 / disk_space) * used_space;

  return (
    <div className="freespace">
      <div className="freespace_text">
        Свободно {totalSpaceMB - usedSpaceMB} МБ из {totalSpaceMB} МБ
      </div>
      <div className="freespace_track">
        <div style={{ width: usedSpacePercent + "%" }} className="freespace_progress"></div>
      </div>
    </div>
  );
};

export default FreeSpace;
