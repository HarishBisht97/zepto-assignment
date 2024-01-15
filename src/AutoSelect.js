import React, { useState, useRef, useEffect } from "react";
import Chip from "./Chip";
import ListItem from "./ListItem";

const AutoSelect = ({ options, onChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const inputRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.some((selected) => selected.value === option.value)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setInputValue("");
    setIsOpen(false);
    onChange([...selectedOptions, option]);
  };

  const handleRemoveOption = (removedOption) => {
    const updatedOptions = selectedOptions.filter(
      (selected) => selected.value !== removedOption.value
    );
    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const filteredOptions = options
    .filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )
    .filter(
      (option) =>
        !selectedOptions.some((selected) => selected.value === option.value)
    );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={inputRef} className="justify-center items-center">
      <div className="flex flex-wrap justify-center items-center border rounded-md bg-gray-100 py-4">
        {selectedOptions.map((selectedOption) => (
          <Chip
            user={selectedOption}
            handleRemoveOption={() => handleRemoveOption(selectedOption)}
          />
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-[800px] max-w-6xl outline-none bg-transparent"
        />
      </div>
      {isOpen && (
        <ul className=" mt-2 border rounded-md bg-white max-h-60 max-w-6xl overflow-y-auto">
          {filteredOptions.map((option) => (
            <li key={option.value} onClick={() => handleOptionClick(option)}>
              <ListItem user={option} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSelect;
