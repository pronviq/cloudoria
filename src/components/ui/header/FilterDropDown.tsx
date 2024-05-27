import React, { useEffect, useRef, useState } from "react";
import "./FilterDropDown.scss";
import ScalesSvg from "../../../images/ScalesSvg";
import DateSvg from "../../../images/DateSvg";
import FilterSvg from "../../../images/FilterSvg";
import ArrowSvg from "../../../images/ArrowSvg";
import { Transition } from "react-transition-group";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedDropDown } from "../../../models/Animation.model";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setCurrentFiles } from "../../../redux/fileSlice";
// import { Transition } from "react-transition-group";

const FilterDropDown: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const [sortStyle, setSortStyle] = useState<string>("");
  const activeBackgroundColor = "rgba(128, 128, 128, 0.2)";
  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const files = useAppSelector((state) => state.fileReducer.currentFiles);
  const dispatch = useAppDispatch();

  const handleFalse = (event: MouseEvent) => {
    const target = (event.target as Node) || null;
    if (!contentRef.current?.contains(target) && !btnRef.current?.contains(target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (sortStyle) {
      let sortedFiles = [...files];
      switch (sortStyle) {
        case "alphabet":
          sortedFiles.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "size":
          sortedFiles.sort((a, b) => b.size - a.size);
          break;
        case "date":
          sortedFiles.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp));
          break;
        default:
          sortedFiles = sortedFiles;
      }
      dispatch(setCurrentFiles(sortedFiles));
    }
  }, [sortStyle]);

  useEffect(() => {
    document.addEventListener("click", handleFalse);
    return () => document.removeEventListener("click", handleFalse);
  }, []);

  return (
    <div className="filter_dd">
      <button ref={btnRef} onClick={() => setActive((p) => !p)} className="filter_head">
        <FilterSvg />
        <ArrowSvg transition="ease .2s" rotate={isActive ? "180deg" : "0deg"} />
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div {...AnimatedDropDown} ref={contentRef} className={`filter_content`}>
            <ul className="filter_content_list">
              <li className="filter_content_item">
                <button
                  onClick={() => setSortStyle("alphabet")}
                  style={{
                    backgroundColor: sortStyle === "alphabet" ? activeBackgroundColor : "",
                  }}
                >
                  <div className="filter_az">Az</div>
                  <p>По алфавиту</p>
                </button>
              </li>
              <li className="filter_content_item">
                <button
                  onClick={() => setSortStyle("size")}
                  style={{
                    backgroundColor: sortStyle === "size" ? activeBackgroundColor : "",
                  }}
                >
                  <ScalesSvg />
                  <p>По размеру</p>
                </button>
              </li>
              <li className="filter_content_item">
                <button
                  onClick={() => setSortStyle("date")}
                  style={{
                    backgroundColor: sortStyle === "date" ? activeBackgroundColor : "",
                  }}
                >
                  <DateSvg />
                  <p>По дате</p>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropDown;
