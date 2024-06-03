import React, { MouseEvent, RefObject, useRef, useState } from "react";
import "./ListFile.scss";
import { IFile } from "../../models/File.model";
import DirectorySvg from "../../images/DirectorySvg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCurrentDir, switchSelection, updateStack } from "../../redux/fileSlice";
import GetSize from "../../utils/GetSize";
import JustFileSvg from "../../images/JustFileSvg";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedListFile } from "../../models/Animation.model";
import FileSvg from "../../images/FileSvg";
import { API_URL } from "../../api/AxiosApi";
import DotsSvg from "../../images/DotsSvg";
import { setContextMenu } from "../../redux/contextSlice";

interface FileInterface {
  file: IFile;
  index: number;
  duration: number;
  filesRef: RefObject<HTMLElement>;
}

export interface IContextMenu {
  x: number | null;
  y: number | null;
}

const ListFile: React.FC<FileInterface> = ({ file, index, duration, filesRef }) => {
  const dispatch = useAppDispatch();
  const stack = useAppSelector((state) => state.fileReducer.stack);
  const selected = useAppSelector((s) => s.fileReducer.selected);

  let isMouseDown = false;

  const setDir = (file: IFile) => {
    if (file.is_trash || file.type !== "dir") return;
    dispatch(setCurrentDir(file.id));
    const newStack = [...stack];
    newStack.push(file);
    dispatch(updateStack(newStack));
  };

  const handleClick = () => {
    if (selected > 0) return dispatch(switchSelection({ index }));
    if (file.type === "dir") setDir(file);
  };

  const handleContextMenu = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    isMouseDown = false;

    const clientRect = filesRef.current?.getBoundingClientRect();
    let x = 0;
    let y = 0;

    if (clientRect) {
      x = e.clientX - clientRect?.x;
      y = e.clientY - clientRect?.y;

      if (x + 135 > window.innerWidth - clientRect?.x) x -= 135;
      const overflowY = window.innerHeight - e.clientY - 115;
      if (overflowY < 0) y += overflowY;

      dispatch(setContextMenu({ file, index, x, y }));
    }
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
          onClick={handleClick}
          className="listfile"
          style={{ backgroundColor: file.is_selected ? "rgba(0, 123, 255, 0.3)" : "" }}
          onContextMenu={handleContextMenu}
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
          <div className="listfile_size">{size}</div>
          <div className="listfile_unit">{unit}</div>
          <div className="listfile_date">{file.timestamp.slice(0, 10)} </div>
          <div className="listfile_time">{file.timestamp.slice(11, 16)}</div>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default ListFile;
