import React from "react";
import "./UploadingFile.scss";
import { IUploadingFile } from "../../models/File.model";
import GetSize from "../../utils/GetSize";
import CloseSvg from "../../images/CloseSvg";
import FileSvg from "../../images/FileSvg";
import { useAppDispatch } from "../../hooks/redux";
import { removeUFile } from "../../redux/uploadSlice";

const UploadingFile: React.FC<{ file: IUploadingFile }> = ({ file }) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeUFile(file));
  };

  const { size, unit } = GetSize(file.size);
  const name = file.name.replace(/\.[^.]*$/, "");
  const dot_split_array = file.name.split(".");
  let type;
  if (dot_split_array.length > 1) type = "." + dot_split_array.pop();

  return (
    <div className="ufile">
      <FileSvg className="ufile_img" />
      <div className="ufile_info">
        <div className="ufile_naming">
          <div className="ufile_name">{name}</div>
          <div className="ufile_type">{type}</div>
        </div>
        <div className="ufile_size">
          {size + unit} {file.error}
        </div>
      </div>
      <button onClick={handleRemove} className="ufile_close">
        <CloseSvg />
      </button>
      <div
        style={{
          width: file.error ? "100%" : file.progress + "%",
          backgroundColor: file.error ? "rgba(255, 0, 0, 0.2)" : "",
        }}
        className="ufile_progress"
      />
    </div>
  );
};

export default UploadingFile;
