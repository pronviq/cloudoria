import React, { useState } from "react";
import "./UploadingFiles.scss";
import SimpleBar from "simplebar-react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedLoadingStack } from "../../models/Animation.model";
import { useAppSelector } from "../../hooks/redux";
import UploadingFile from "./UploadingFile";
import ArrowSvg from "../../images/ArrowSvg";

const UploadingFiles: React.FC = () => {
  const [isActive, setActive] = useState<boolean>(true);

  const uploadingFiles = useAppSelector((state) => state.uploadReducer.files);
  // console.log(uploadingFiles);
  const totalPerc = uploadingFiles.reduce((acc, curr) => {
    if (curr.error) {
      return acc + 100;
    }
    return acc + curr.progress;
  }, 0);
  const percentage = Math.round(totalPerc / uploadingFiles.length);

  return (
    <div className="loadingstack">
      <header onClick={() => setActive((i) => !i)} className="loadingstack_header">
        <div className="loadingstack_title">
          {percentage !== 100 ? "Загрузка файлов " + percentage + "%" : "Все файлы загружены"}
        </div>
        <div className="loadingstack_close">
          <ArrowSvg rotate={isActive ? "0deg" : "180deg"} />
        </div>
      </header>

      <AnimatePresence>
        {isActive && (
          <motion.div {...AnimatedLoadingStack} className="loadingstack_content">
            <SimpleBar style={{ height: "100%" }}>
              {uploadingFiles.map((file, i) => (
                <UploadingFile key={i} file={file} />
              ))}
            </SimpleBar>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadingFiles;
