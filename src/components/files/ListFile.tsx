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

interface FileInterface {
  file: IFile;
  index: number;
}

const ListFile: React.FC<FileInterface> = ({ file, index }) => {
  // console.log(index, file);

  const location = useLocation();
  const path = location.pathname;
  const dispatch = useAppDispatch();
  const stack = useAppSelector((state) => state.fileReducer.stack);

  const setDir = (file: IFile) => {
    dispatch(setCurrentDir(file.id));
    const newStack = [...stack];
    newStack.push(file);
    dispatch(updateStack(newStack));
  };

  const handleFavorite = async (e: Event) => {
    e.stopPropagation();
    const data = await FileService.switchFavorite(file);

    if (data) {
      dispatch(switchFavorite({ index }));
    }
  };

  const handleTrash = async (e: Event) => {
    e.stopPropagation();
    const data = await FileService.switchTrash(file);
    if (data) {
      dispatch(switchTrash({ index }));
    }
  };

  const handleDelete = async (e: Event) => {
    e.stopPropagation();
    const data = await FileService.deleteFile(file);
    // console.log(data);

    if (data) {
      dispatch(deleteFile({ index }));
    }
  };

  return (
    <>
      {((path === "/" && !file.is_trash) ||
        (path === "/trash" && file.is_trash) ||
        (path === "/favorites" && !file.is_trash && file.is_favorite)) && (
        <button onClick={() => setDir(file)} className="listfile">
          {file.type === "dir" && <DirectorySvg className="directorysvg" size={25} />}
          <div className="listfile_name">{file.name}</div>
          <div className="listfile_date">{file.timestamp.slice(0, 10)} </div>
          <div className="listfile_time">{file.timestamp.slice(11, 16)}</div>
          <div className="listfile_size">{file.size}КБ</div>
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
      )}
    </>
  );
};

export default ListFile;
