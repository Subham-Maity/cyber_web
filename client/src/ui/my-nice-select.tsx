"use client";
import React, { useState, useCallback, useRef } from "react";
import { useClickAway } from "react-use";

type Option = {
  value: string;
  label: string;
};

type IPropType = {
  options: Option[];
  defaultCurrent: number;
  placeholder?: string;
  cls?: string | undefined;
  onChange: (item: Option) => void;
  onInputChange: (input: string) => void; // Add a callback for input changes
  name: string;
};

const NiceSelect = ({
  options,
  defaultCurrent,
  placeholder,
  cls,
  onChange,
  onInputChange, // Add the callback for input changes
  name,
}: IPropType) => {
  // State management
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(options[defaultCurrent]);
  const [inputValue, setInputValue] = useState(""); // State to store user input
  const [filteredOptions, setFilteredOptions] = useState(options); // State for filtered suggestions

  // Callback to close the dropdown
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  // Ref for detecting clicks outside the component
  const ref = useRef(null);

  // Hook to detect clicks outside the component and trigger onClose
  useClickAway(ref, onClose);

  // Function to handle the selection of an option
  const currentHandler = (item: { value: string; label: string }) => {
    setCurrent(item);
    onChange(item);
    onClose();
  };

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    // Filter the options based on the user's input
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredOptions(filteredOptions);

    // Call the input change callback
    onInputChange(inputValue);
  };

  return (
    <div
      className={`nice-select ${cls ? cls : ""} ${open && "open"}`}
      role="button"
      tabIndex={0}
      onClick={() => setOpen((prev) => !prev)}
      ref={ref}
    >
      <input
        type="text"
        className="input" // Apply appropriate CSS styles for the input field
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      {open && (
        <ul className="list" role="menubar">
          {filteredOptions.map((item, i) => (
            <li
              key={i}
              data-value={item.value}
              className={`option ${
                item.value === current?.value && "selected focus"
              }`}
              role="menuitem"
              onClick={() => currentHandler(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NiceSelect;
