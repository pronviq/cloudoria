import React from "react";
import "./FileSelection.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { deleteSel, dropSelection, selectAll, switchTrashSel } from "../../redux/fileSlice";
import CloseSvg from "../../images/CloseSvg";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSelection } from "../../models/Animation.model";
import { useLocation } from "react-router-dom";
import GetSize from "../../utils/GetSize";
import FileService from "../../services/FileService";
import { updateSize } from "../../redux/userSlice";
import CheckmarkSvg from "../../images/CheckmarkSvg";

const FileSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.fileReducer.selected);
  const location = useLocation();
  const files = useAppSelector((state) => state.fileReducer.currentFiles);

  const downloadSelected = () => {};

  const switchTrashSelected = async () => {
    files.map((file, index) => {
      file.is_selected && FileService.switchTrash(file, index, false);
    });
    dispatch(switchTrashSel());
    dispatch(dropSelection());
  };

  const deleteSelected = () => {
    let totalSize = 0;
    files.forEach((file, i) => {
      if (file.is_selected) {
        FileService.deleteFile(file, i, false);
        totalSize += file.size;
      }
    });
    dispatch(updateSize(totalSize * -1));
    dispatch(deleteSel());
    dispatch(dropSelection());
  };

  const { size, unit } = GetSize(
    files.reduce((acc, curr) => (curr.is_selected ? acc + curr.size : acc), 0)
  );
  const totalLength = size + unit;

  return (
    <AnimatePresence>
      {selected > 0 && (
        <div className="filesel">
          <motion.div className="filesel_cont" {...AnimatedSelection}>
            {/* <div className="filesel_cont"> */}
            <div onClick={() => dispatch(dropSelection())} className="filesel_drop">
              <CloseSvg />
            </div>
            <button
              onClick={() =>
                selected === files.length ? dispatch(dropSelection()) : dispatch(selectAll())
              }
              className="filesel_all"
            >
              <div className="filesel_checkmark">
                <CheckmarkSvg />
              </div>
              {selected === files.length
                ? `${selected} Снять выделение`
                : `${selected} Выделить все`}
            </button>
            <button
              onClick={() =>
                location.pathname === "/trash" ? switchTrashSelected() : downloadSelected()
              }
              className="filesel_download"
            >
              {location.pathname === "/trash" ? "Восстановить" : `Загрузить ${totalLength}`}
            </button>
            <button
              onClick={() =>
                location.pathname === "/trash" ? deleteSelected() : switchTrashSelected()
              }
              className="filesel_removeall"
            >
              {location.pathname === "/trash" ? "Удалить" : "Переместить в корзину"}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FileSelection;
