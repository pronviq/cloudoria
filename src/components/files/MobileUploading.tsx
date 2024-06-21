import { useEffect, useRef, useState } from "react";
import "./MobileUploading.scss";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedUploading } from "../../models/Animation.model";
import SimpleBar from "simplebar-react";
import UploadingFile from "./UploadingFile";
import { useAppSelector } from "../../hooks/redux";
import UploadSvg from "../../images/UploadSvg";

const MobileUploading = () => {
  const [isActive, setActive] = useState<boolean>(false);
  const uploadingFiles = useAppSelector((state) => state.uploadReducer.files);
  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const totalPerc = uploadingFiles.reduce((acc, curr) => {
    if (curr.error) {
      return acc + 100;
    }
    return acc + curr.progress;
  }, 0);

  const percentage = Math.round(totalPerc / uploadingFiles.length);

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
    <article className="mobileuploading">
      <button
        ref={btnRef}
        onClick={() => {
          if (uploadingFiles.length) setActive((p) => !p);
        }}
        className={"mobileuploading_button" + (uploadingFiles.length === 0 ? " unactive" : "")}
        style={{ opacity: uploadingFiles.length ? "1" : "0.5" }}
      >
        <span>{isNaN(percentage) ? 100 : percentage}%</span>
        <UploadSvg width="15px" />
      </button>
      <AnimatePresence>
        {isActive && uploadingFiles.length && (
          <motion.div {...AnimatedUploading} ref={contentRef} className="mobileuploading_content">
            <SimpleBar style={{ height: "100%" }}>
              {uploadingFiles.map((file, i) => (
                <UploadingFile key={i} file={file} />
              ))}
            </SimpleBar>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default MobileUploading;
