import React, { useEffect, useRef, useState } from "react";
import "./FilterDropDown.scss";
import ScalesSvg from "../../images/ScalesSvg";
import DateSvg from "../../images/DateSvg";
import FilterSvg from "../../images/FilterSvg";
import ArrowSvg from "../../images/ArrowSvg";
import { Transition } from "react-transition-group";
// import { Transition } from "react-transition-group";

const FilterDropDown: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const [sortStyle, setSortStyle] = useState<string>("");
  const activeBackgroundColor = "rgba(128, 128, 128, 0.2)";
  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFalse = (event: MouseEvent) => {
    const target = (event.target as Node) || null;
    if (!contentRef.current?.contains(target) && !btnRef.current?.contains(target)) {
      setActive(false);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    document.addEventListener("click", handleFalse);
    return () => document.removeEventListener("click", handleFalse);
  }, []);

  return (
    <div className="filter_dd">
      <button ref={btnRef} onClick={() => setActive((p) => !p)} className="filter_head">
        <FilterSvg />
        <ArrowSvg isActive={isActive} />
      </button>
      <Transition mountOnEnter unmountOnExit in={isActive} timeout={50}>
        {(state) => (
          <div ref={contentRef} className={`filter_content ${state}`}>
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
          </div>
        )}
      </Transition>
    </div>
  );
};

export default FilterDropDown;
