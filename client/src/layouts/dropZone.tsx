import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "@/redux/hook";
import Image from "next/image";
import icon from "@/assets/images/icon/icon_11.svg";

const DropZone = ({
  showIcon,
  style,
  text,
  setFile,
}: {
  text: string;
  showIcon?: boolean;
  style?: string;
  setFile: (file: File | null) => void;
}) => {
  // const dispatch = useAppDispatch();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      console.log(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className=" d-flex align-items-center">
          {showIcon && <Image src={icon} alt="icon" className="lazy-img" />}
          <span className={`fw-500 ms-2 ${style}`}>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
