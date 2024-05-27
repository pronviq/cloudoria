import React from "react";
import "./ListFile.scss";
import { IFile } from "../../models/File.model";
import DirectorySvg from "../../images/DirectorySvg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  deleteFile,
  setCurrentDir,
  switchFavorite,
  switchTrash,
  updateStack,
} from "../../redux/fileSlice";
import FavoriteSvg from "../../images/FavoriteSvg";
import TrashSvg from "../../images/TrashSvg";
import FileService from "../../services/FileService";
import ReloadSvg from "../../images/ReloadSvg";
import BurnSvg from "../../images/BurnSvg";
import GetSize from "../../utils/GetSize";
import { updateSize } from "../../redux/userSlice";
import { API_URL } from "../../api/AxiosApi";
import JustFileSvg from "../../images/JustFileSvg";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedListFile } from "../../models/Animation.model";
import FileSvg from "../../images/FileSvg";

interface FileInterface {
  file: IFile;
  index: number;
  duration: number;
}

const ListFile: React.FC<FileInterface> = ({ file, index, duration }) => {
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
    await FileService.switchFavorite(file, index);
  };

  const handleTrash = async (e: Event) => {
    e.stopPropagation();
    await FileService.switchTrash(file, index);
  };

  const handleDelete = async (e: Event) => {
    e.stopPropagation();
    await FileService.deleteFile(file, index);
  };

  const { size, unit } = GetSize(file.size);
  const dot_split_array = file.name.split(".");
  let ext;
  if (dot_split_array.length > 1) ext = "." + dot_split_array.pop();
  const name = file.name.replace(/\.[^.]*$/, "");
  const type = file.type.split("/").shift();

  return (
    <AnimatePresence>
      <motion.div transition={{ duration: duration }} {...AnimatedListFile}>
        <button onClick={() => setDir(file)} className="listfile">
          {type === "dir" ? (
            <DirectorySvg className="listfile_file" size={25} />
          ) : type === "image" ? (
            <img
              width={30}
              height={30}
              className="listfile_file"
              src={API_URL + "/getpreview/" + file.id}
              alt="preview"
            ></img>
          ) : type === "text" ? (
            <FileSvg className="listfile_file" />
          ) : (
            <JustFileSvg
              className="listfile_file"
              format={ext?.toUpperCase().slice(1, ext.length)}
              width={30}
            />
          )}
          <div className="listfile_info">
            <div className="listfile_name">{name}</div>
            <div className="listfile_type">{ext}</div>
          </div>
          <div className="listfile_date">{file.timestamp.slice(0, 10)} </div>
          <div className="listfile_time">{file.timestamp.slice(11, 16)}</div>
          <div className="listfile_size">{size}</div>
          <div className="listfile_unit">{unit}</div>
          {!file.is_trash ? (
            <>
              <div
                data-title={file.is_favorite ? "Удалить из избранного" : "Добавить в избранное"}
                className="listfile_svg"
              >
                <FavoriteSvg isfill={file.is_favorite.toString()} onClick={handleFavorite} />
              </div>
              <div data-title="Переместить в корзину" className="listfile_svg">
                <TrashSvg onClick={handleTrash} />
              </div>
            </>
          ) : (
            <>
              <div data-title="Восстановить файл" className="listfile_svg">
                <ReloadSvg onClick={handleTrash} />
              </div>
              <div data-title="Удалить навсегда" className="listfile_svg">
                <BurnSvg onClick={handleDelete} />
              </div>
            </>
          )}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ListFile;
