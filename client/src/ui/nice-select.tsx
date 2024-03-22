"use client";
import { getDate } from "@/utils/helper";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useClickAway } from "react-use";

type Option = {
  value: string;
  label: string;
  date?: string;
};

type IPropType = {
  options: Option[];
  defaultCurrent?: number;
  placeholder?: string;
  cls?: string | undefined;
  onChange: (item: Option) => void;
  name: string;
  isScroll?: boolean;
  defaultValue?:string;
  dataMode?:string;
};

const NiceSelect = ({
  isScroll = false,
  options,
  defaultCurrent,
  placeholder,
  cls,
  onChange,
  name,
  defaultValue,
  dataMode,
}: IPropType) => {
  // console.log(defaultCurrent, "from defalt current");
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(
    defaultCurrent!==undefined ? options[defaultCurrent] : undefined
  );
  useEffect(() => {
    
    if(defaultValue !== ""){
      const d = options.findIndex((o) => o.value === defaultValue);
      console.log(d);
      setCurrent(options[d]);
    }
  },[defaultValue])
  useEffect(() => {
    setCurrent(defaultCurrent!==undefined ? options[defaultCurrent] : undefined);
  }, [defaultCurrent,dataMode]);
  const onClose = useCallback(() => {
    setOpen(false);
    // setCurrent(undefined);
  }, []);
  const ref = useRef(null);

  useClickAway(ref, onClose);

  const currentHandler = (item: { value: string; label: string }) => {
    setCurrent(item);

    onChange(item);
    onClose();
  };

  return (
    <div
      className={`nice-select ${cls ? cls : ""} ${open && "open"} `}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      ref={ref}
    >
      <span className="current">
        {/* {current?.label || placeholder} */}
        {current ? (
          <span className="current">{current.label}</span>
        ) : (
          <span className="placeholderNew">{placeholder}</span>
        )}
      </span>
      <ul
        className={`list ${isScroll && "add_Scroll_to_nice_select"}`}
        role="menubar"
        onClick={(e) => e.stopPropagation()}
      >
        {options?.map((item, i) => (
          <li
            key={i}
            data-value={item.value}
            className={`option ${
              item.value === current?.value && "selected focus"
            }`}
            role="menuitem"
            onClick={() => currentHandler(item)}
          >
            {item.label} {item.date && `(${getDate(item.date.split("T")[0])})`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NiceSelect;
