import React from "react";
import "./File.scss";
import { IFile } from "../../models/File.model";
import DirectorySvg from "../../images/DirectorySvg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  deleteFile,
  pushFile,
  setCurrentDir,
  switchFavorite,
  switchTrash,
  updateStack,
} from "../../redux/fileSlice";
import FavoriteSvg from "../../images/FavoriteSvg";
import TrashSvg from "../../images/TrashSvg";
import FileService from "../../services/FileService";
import { useLocation } from "react-router-dom";
import ReloadSvg from "../../images/ReloadSvg";
import BurnSvg from "../../images/BurnSvg";
import GetSize from "../../utils/GetSize";
import CutName from "../../utils/CutName";
import { updateSize } from "../../redux/userSlice";
import { API_URL } from "../../api/AxiosApi";
import JustFileSvg from "../../images/JustFileSvg";

interface FileInterface {
  file: IFile;
  index: number;
}

const ListFile: React.FC<FileInterface> = ({ file, index }) => {
  const dispatch = useAppDispatch();
  const stack = useAppSelector((state) => state.fileReducer.stack);

  const setDir = (file: IFile) => {
    if (file.is_trash || file.type !== "dir") return;
    dispatch(setCurrentDir(file.id));
    const newStack = [...stack];
    newStack.push(file);
    dispatch(updateStack(newStack));
  };

  const handleFavorite = async (e: Event) => {
    e.stopPropagation();
    dispatch(switchFavorite({ index }));
    await FileService.switchFavorite(file);
  };

  const handleTrash = async (e: Event) => {
    e.stopPropagation();
    dispatch(switchTrash({ index }));
    await FileService.switchTrash(file);
  };

  const handleDelete = async (e: Event) => {
    e.stopPropagation();
    if (await FileService.deleteFile(file)) {
      dispatch(deleteFile({ index }));
      dispatch(updateSize(file.size * -1));
    }
  };

  const { size, unit } = GetSize(file.size);
  const dot_split_array = file.name.split(".");
  let type;
  if (dot_split_array.length > 1) type = "." + dot_split_array.pop();
  const name = file.name.replace(/\.[^.]*$/, "");

  return (
    <>
      <button onClick={() => setDir(file)} className="listfile">
        {file.type === "dir" ? (
          <DirectorySvg className="directorysvg" size={25} />
        ) : file.type === "image/png" ? (
          <img
            width={30}
            height={30}
            className="directorysvg"
            src={API_URL + "/getpreview/" + file.id}
            alt="preview"
          ></img>
        ) : (
          <JustFileSvg format={type?.toUpperCase().slice(1, type.length)} width={30} />
        )}
        <div className="listfile_info">
          <div className="listfile_name">{name}</div>
          <div className="listfile_type">{type}</div>
        </div>
        <div className="listfile_date">{file.timestamp.slice(0, 10)} </div>
        <div className="listfile_time">{file.timestamp.slice(11, 16)}</div>
        <div className="listfile_size">{size}</div>
        <div className="listfile_unit">{unit}</div>
        {!file.is_trash ? (
          <>
            <FavoriteSvg
              isfill={file.is_favorite.toString()}
              onClick={handleFavorite}
              className="listfile_svg"
            />
            <TrashSvg onClick={handleTrash} className="listfile_svg" />
          </>
        ) : (
          <>
            <ReloadSvg onClick={handleTrash} className="listfile_svg" />
            <BurnSvg onClick={handleDelete} className="listfile_svg" />
          </>
        )}
      </button>
    </>
  );
};

export default ListFile;
