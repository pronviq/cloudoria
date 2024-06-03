import React, { MouseEvent, useEffect } from "react";
import "./LfContext.scss";
import SelectSvg from "../../images/SelectSvg";
import DownloadSvg from "../../images/DownloadSvg";
import RenameSvg from "../../images/RenameSvg";
import FavoriteSvg from "../../images/FavoriteSvg";
import TrashSvg from "../../images/TrashSvg";
import FileService from "../../services/FileService";
import BurnSvg from "../../images/BurnSvg";
import ReloadSvg from "../../images/ReloadSvg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { switchSelection } from "../../redux/fileSlice";
import { setContextMenu } from "../../redux/contextSlice";
import { useLocation } from "react-router-dom";

const LfContext: React.FC = () => {
  const dispatch = useAppDispatch();
  const context = useAppSelector((s) => s.contextReducer);
  const file = useAppSelector((s) => s.fileReducer.currentFiles)[context.index || 0];
  const location = useLocation();

  const handleFalse = () => {
    dispatch(setContextMenu({ file: null, index: null, x: null, y: null }));
  };

  const handleFavorite = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // @ts-ignore
    await FileService.switchFavorite(file, context.index);
  };

  const handleTrash = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleFalse();
    // @ts-ignore
    await FileService.switchTrash(file, context.index);
  };

  const handleDelete = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    handleFalse();
    // @ts-ignore
    await FileService.deleteFile(file, context.index);
  };

  const handleSelect = () => {
    // @ts-ignore
    dispatch(switchSelection({ index: context.index }));
  };

  const handleDownload = async () => {
    const blob = await FileService.downloadFile(file.id);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = context.file?.name || "file";
    link.click();
    link.remove();
  };

  useEffect(() => {
    handleFalse();
  }, [location.pathname]);

  useEffect(() => {
    document.addEventListener("click", handleFalse);
    return () => document.removeEventListener("click", handleFalse);
  }, []);

  return (
    <>
      {context.x !== null && (
        <ul
          onContextMenu={(e) => e.preventDefault()}
          style={{ top: context.y + "px", left: context.x + "px" }}
          className="lfcontext_list"
        >
          <li>
            <button onClick={handleSelect} className="lfcontext_item">
              <SelectSvg padding="1px" height="100%" />
              <p>Выбрать</p>
            </button>
          </li>
          <hr className="lfcontext_hr" />
          <li>
            {file.is_trash || file.type === "dir" ? (
              <div className="lfcontext_item unactive">
                <DownloadSvg padding="3px" height="100%" />
                <p>Скачать</p>
              </div>
            ) : (
              <button onClick={handleDownload} className="lfcontext_item">
                <DownloadSvg padding="3px" height="100%" />
                <p>Скачать</p>
              </button>
            )}
          </li>
          <li>
            <div className="lfcontext_item unactive">
              <RenameSvg padding="5px" height="100%" />
              <p>Переименовать</p>
            </div>
          </li>
          <li>
            {!file?.is_trash ? (
              <button onClick={handleFavorite} className="lfcontext_item">
                <FavoriteSvg isfill={file?.is_favorite.toString()} padding="3px" height="100%" />
                <p>Избранное</p>
              </button>
            ) : (
              <button onClick={handleTrash} className="lfcontext_item">
                <ReloadSvg padding="3px" height="100%" />
                <p>Восстановить</p>
              </button>
            )}
          </li>
          <hr className="lfcontext_hr" />
          <li>
            {!file?.is_trash ? (
              <button onClick={handleTrash} className="lfcontext_item">
                <TrashSvg padding="3px" height="100%" />
                <p>В корзину</p>
              </button>
            ) : (
              <button onClick={handleDelete} className="lfcontext_item">
                <BurnSvg padding="3px" height="100%" />
                <p>Удалить</p>
              </button>
            )}
          </li>
        </ul>
      )}
    </>
  );
};

export default LfContext;
