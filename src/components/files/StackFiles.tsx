import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./StackFiles.scss";
import { IFile } from "../../models/File.model";
import { setCurrentDir, updateStack } from "../../redux/fileSlice";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import FilesSvg from "../../images/FilesSvg";
import FavoriteSvg from "../../images/FavoriteSvg";
import TrashSvg from "../../images/TrashSvg";
import SettingsSvg from "../../images/SettingsSvg";

const StackFiles: React.FC = () => {
  const stack = useAppSelector((state) => state.fileReducer.stack);
  const root_directory = useAppSelector((state) => state.userReducer.root_directory);
  const dispatch = useAppDispatch();
  const location = useLocation();
  // console.log(stack);

  const handleStack = (item: IFile, i: number) => {
    let newStack: IFile[] = [];
    stack.forEach((val, index) => {
      if (index <= i) {
        newStack.push(val);
      }
    });

    dispatch(setCurrentDir(item.id));
    dispatch(updateStack(newStack));
  };

  const handleCurrent = () => {
    dispatch(setCurrentDir(root_directory));
    dispatch(updateStack([]));
  };

  return (
    <SimpleBar className="stack_simplebar">
      <div className="stack_files">
        <div onClick={() => handleCurrent()} className="stack_file">
          {location.pathname === "/favorites" && (
            <div className="stack_start">
              <FavoriteSvg height="100%" />
              Избранное
            </div>
          )}
          {location.pathname === "/" && (
            <div className="stack_start">
              <FilesSvg height="100%" />
              Все файлы
            </div>
          )}
          {location.pathname === "/trash" && (
            <div className="stack_start">
              <TrashSvg height="100%" />
              Корзина
            </div>
          )}
          {location.pathname === "/settings" && (
            <div className="stack_start">
              <SettingsSvg height="100%" />
              Настройки
            </div>
          )}
        </div>
        {stack.map((item, i) => (
          <React.Fragment key={i}>
            <span>&gt;</span>
            <div onClick={() => handleStack(item, i)} className="stack_file" key={i}>
              {item.name}
            </div>
          </React.Fragment>
        ))}
      </div>
    </SimpleBar>
  );
};

export default StackFiles;
