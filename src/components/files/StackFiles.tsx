import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./StackFiles.scss";
import { IFile } from "../../models/File.model";
import { setCurrentDir, updateStack } from "../../redux/fileSlice";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";

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
        <button onClick={() => handleCurrent()} className="stack_file">
          {location.pathname === "/favorites" && "Избранное"}
          {location.pathname === "/" && "Все файлы"}
          {location.pathname === "/trash" && "Корзина"}
        </button>
        {stack.map((item, i) => (
          <React.Fragment key={i}>
            <span>&gt;</span>
            <button onClick={() => handleStack(item, i)} className="stack_file" key={i}>
              {item.name}
            </button>
          </React.Fragment>
        ))}
      </div>
    </SimpleBar>
  );
};

export default StackFiles;
