"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  setSelected: React.Dispatch<React.SetStateAction<File | null>>;
  text: string;
}

function Upload({ text, setSelected }: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelected(acceptedFiles[0]);
  }, []);
  const dropzoneOptions = {
    onDrop,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  return (
    <div {...getRootProps()} className="d-flex flex">
      <input {...getInputProps()} />
      <i className="bi bi-plus"></i>
      <p>{text}</p>
    </div>
  );
}

export default Upload;
