import React, { useEffect, useRef, useState } from "react";
import "./FilterDropDown.scss";

const FilterDropDown: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const [sortStyle, setSortStyle] = useState<string>("alphabet");
  const activeBackgroundColor = "rgba(128, 128, 128, 0.2)";
  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFalse = (event: MouseEvent) => {
    const target = (event.target as Node) || null;
    if (!contentRef.current?.contains(target) && !btnRef.current?.contains(target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleFalse);
    return () => document.removeEventListener("click", handleFalse);
  }, []);

  return (
    <div className="filter_dd">
      <button ref={btnRef} onClick={() => setActive((p) => !p)} className="filter_head">
        <svg
          className="filter_ico"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 16L13 16" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 11H13" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 6L13 6" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M17 4L17 20L20 16"
            stroke="#1C274C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <svg
          style={{ rotate: isActive ? "180deg" : "0deg" }}
          className="down_ico"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isActive && (
        <div ref={contentRef} className="filter_content">
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
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 17V16.8498C2 16.5333 2 16.3751 2.02421 16.2209C2.0457 16.084 2.08136 15.9497 2.13061 15.8202C2.18609 15.6743 2.2646 15.5369 2.42162 15.2622L6 9M2 17C2 19.2091 3.79086 21 6 21C8.20914 21 10 19.2091 10 17M2 17V16.8C2 16.52 2 16.38 2.0545 16.273C2.10243 16.1789 2.17892 16.1024 2.273 16.0545C2.37996 16 2.51997 16 2.8 16H9.2C9.48003 16 9.62004 16 9.727 16.0545C9.82108 16.1024 9.89757 16.1789 9.9455 16.273C10 16.38 10 16.52 10 16.8V17M6 9L9.57838 15.2622C9.7354 15.5369 9.81391 15.6743 9.86939 15.8202C9.91864 15.9497 9.9543 16.084 9.97579 16.2209C10 16.3751 10 16.5333 10 16.8498V17M6 9L18 7M14 15V14.8498C14 14.5333 14 14.3751 14.0242 14.2209C14.0457 14.084 14.0814 13.9497 14.1306 13.8202C14.1861 13.6743 14.2646 13.5369 14.4216 13.2622L18 7M14 15C14 17.2091 15.7909 19 18 19C20.2091 19 22 17.2091 22 15M14 15V14.8C14 14.52 14 14.38 14.0545 14.273C14.1024 14.1789 14.1789 14.1024 14.273 14.0545C14.38 14 14.52 14 14.8 14H21.2C21.48 14 21.62 14 21.727 14.0545C21.8211 14.1024 21.8976 14.1789 21.9455 14.273C22 14.38 22 14.52 22 14.8V15M18 7L21.5784 13.2622C21.7354 13.5369 21.8139 13.6743 21.8694 13.8202C21.9186 13.9497 21.9543 14.084 21.9758 14.2209C22 14.3751 22 14.5333 22 14.8498V15M12 3V8"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#000000" />
                  <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#000000" />
                  <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#000000" />
                </svg>
                <p>По дате</p>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterDropDown;
