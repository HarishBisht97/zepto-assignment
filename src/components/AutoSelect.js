import React, { useState, useEffect, useRef } from "react";
import Chip from "./Chip";
import ListItem from "./ListItem";

const EMPTY_STRING = "";
const BACKSPACE = "Backspace";

const AutoSelect = ({ options, onChange }) => {
  const [inputValue, setInputValue] = useState(EMPTY_STRING);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef();

  const handleInputChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === BACKSPACE) {
      if (inputValue === EMPTY_STRING && highlightedIndex === -1) {
        setHighlightedIndex(selectedOptions.length - 1);
      } else if (inputValue === EMPTY_STRING && highlightedIndex >= 0) {
        handleRemoveOption(selectedOptions[highlightedIndex]);
        setHighlightedIndex(-1);
      }
    }
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.some((selected) => selected.value === option.value)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setInputValue(EMPTY_STRING);
    setIsOpen(false);
    onChange([...selectedOptions, option]);
  };

  const handleRemoveOption = (removedOption) => {
    const updatedOptions = selectedOptions.filter(
      (selected) => selected.value !== removedOption.value
    );
    setSelectedOptions(updatedOptions);
    setHighlightedIndex(-1);
    onChange(updatedOptions);
  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedOptions.some((selected) => selected.value === option.value)
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const renderSelectedOptions = () => (
    <div className="flex flex-wrap max-w-3xl border rounded-md bg-gray-100 py-4 w-[800px]">
      {selectedOptions.map((selectedOption, index) => (
        <Chip
          key={selectedOption.value}
          user={selectedOption}
          handleRemoveOption={() => handleRemoveOption(selectedOption)}
          isHighlighted={index === highlightedIndex}
        />
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className="flex-grow max-w-6xl outline-none bg-transparent mx-3"
      />
    </div>
  );

  const renderOptionsList = () => (
    <ul className=" mt-2 border rounded-md bg-white max-h-60 max-w-6xl overflow-y-auto">
      {filteredOptions.map((option) => (
        <li key={option.value} onClick={() => handleOptionClick(option)}>
          <ListItem user={option} />
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={inputRef} className="justify-center items-center">
      {renderSelectedOptions()}
      {isOpen && renderOptionsList()}
    </div>
  );
};

export default AutoSelect;
