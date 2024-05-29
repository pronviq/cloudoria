import React, { ReactEventHandler, useRef, useState } from "react";
import "./ListFile.scss";
import { IFile } from "../../models/File.model";
import DirectorySvg from "../../images/DirectorySvg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCurrentDir, switchSelection, updateStack } from "../../redux/fileSlice";
import FavoriteSvg from "../../images/FavoriteSvg";
import TrashSvg from "../../images/TrashSvg";
import FileService from "../../services/FileService";
import ReloadSvg from "../../images/ReloadSvg";
import BurnSvg from "../../images/BurnSvg";
import GetSize from "../../utils/GetSize";
import JustFileSvg from "../../images/JustFileSvg";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedListFile } from "../../models/Animation.model";
import FileSvg from "../../images/FileSvg";
import { API_URL } from "../../api/AxiosApi";

interface FileInterface {
  file: IFile;
  index: number;
  duration: number;
}

const ListFile: React.FC<FileInterface> = ({ file, index, duration }) => {
  const dispatch = useAppDispatch();
  const stack = useAppSelector((state) => state.fileReducer.stack);
  const selected = useAppSelector((state) => state.fileReducer.selected);

  let isMouseDown = false;
  const [isSelected, setSelected] = useState<boolean>(false);
  let selectionRef = useRef<NodeJS.Timeout>();

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

  const handleDown = () => {
    isMouseDown = true;
    clearTimeout(selectionRef.current);
    selectionRef.current = setTimeout(() => {
      if (isMouseDown && !selected) {
        handleSelect();
        setSelected(true);
      }
    }, 500);
  };

  const handleSelect = () => {
    dispatch(switchSelection({ index }));
  };

  const handleUp = () => {
    isMouseDown = false;
    if (selected === 0) {
      setDir(file);
    } else if (!isSelected) {
      handleSelect();
    }
    setSelected(false);
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
        <button
          onPointerUp={handleUp}
          onPointerDown={handleDown}
          className="listfile"
          style={{ backgroundColor: file.is_selected ? "rgba(80, 94, 253, 0.3)" : "" }}
        >
          {type === "dir" ? (
            <DirectorySvg className="listfile_file" size={25} />
          ) : type === "image" ? (
            <img
              width={30}
              height={30}
              className="listfile_file"
              src={API_URL + "/getpreview/" + file.id}
              alt=""
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
                <FavoriteSvg
                  isfill={file.is_favorite.toString()}
                  onMouseDown={(e: Event) => e.stopPropagation()}
                  onMouseUp={(e: Event) => e.stopPropagation()}
                  onClick={handleFavorite}
                />
              </div>
              <div data-title="Переместить в корзину" className="listfile_svg">
                <TrashSvg
                  onMouseDown={(e: Event) => e.stopPropagation()}
                  onMouseUp={(e: Event) => e.stopPropagation()}
                  onClick={handleTrash}
                />
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
