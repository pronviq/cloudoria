import React from "react";
import "./FreeSpace.scss";
import { useAppSelector } from "../../../hooks/redux";

const FreeSpace: React.FC = () => {
  const { disk_space, used_space } = useAppSelector((state) => state.userReducer);
  // const selector = useAppSelector((state) => state.userReducer);

  const totalSpaceMB = disk_space / 1024 / 1024;
  const usedSpaceMB = used_space / 1024 / 1024;

  const usedSpacePercent = (100 / disk_space) * used_space;
  const freeSpace = Math.floor((totalSpaceMB - usedSpaceMB) * 10) / 10;
  const totalSpace = Math.floor(totalSpaceMB * 10) / 10;

  return (
    <div className="freespace">
      <div className="freespace_text">
        Свободно {freeSpace} МБ из {totalSpace} МБ
      </div>
      <div className="freespace_track">
        <div style={{ width: usedSpacePercent + "%" }} className="freespace_progress"></div>
        <div className="freespace_perc">{Math.round(usedSpacePercent) + "%"}</div>
      </div>
    </div>
  );
};

export default FreeSpace;
