import { AnimatePresence, motion } from "framer-motion";
import React, { MouseEvent } from "react";
import "./PopupMenu.scss";
import { AnimatedPopup, AnimatedPopupBG } from "../../../models/Animation.model";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setName } from "../../../redux/popupSlice";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import CreateDir from "../navbar/CreateDir";
import ConfirmDelete from "./ConfirmDelete";

const PopupMenu: React.FC = () => {
  const name = useAppSelector((s) => s.popupReducer.name);
  const dispatch = useAppDispatch();

  const handleOff = (e: MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    if (e.target.className === "popupmenu_bg") dispatch(setName(""));
  };

  return (
    <div className="popupmenu_page">
      <AnimatePresence>
        {name && (
          <motion.div
            {...AnimatedPopupBG}
            hidden={name === null}
            className="popupmenu_bg"
            onClick={(e) => handleOff(e)}
          >
            {name && (
              <motion.div className="popupmenu_content" {...AnimatedPopup}>
                {name === "username" ? (
                  <ChangeUsername />
                ) : name === "email" ? (
                  <ChangeEmail />
                ) : name === "password" ? (
                  <ChangePassword />
                ) : name === "directory" ? (
                  <CreateDir />
                ) : name === "delete" ? (
                  <ConfirmDelete />
                ) : null}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopupMenu;
