import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import "./StackFiles.scss";
import { IFile } from "../../models/File.model";
import { setCurrentDir, updateStack } from "../../redux/fileSlice";
import SimpleBar from "simplebar-react";

const StackFiles: React.FC = () => {
  const stack = useAppSelector((state) => state.fileReducer.stack);
  const root_directory = useAppSelector((state) => state.userReducer.root_directory);
  const dispatch = useAppDispatch();
  // console.log(stack);

  const handleStack = (item: IFile, i: number) => {
    let newStack: IFile[] = [];
    stack.forEach((val, index) => {
      if (index <= i) {
        newStack.push(val);
      }
    });
    // console.log(newStack);

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
          Все файлы
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
