import React from "react";
import xMark from "../../src/assets/xMark.svg";

const Chip = ({ user, handleRemoveOption, isHighlighted }) => {
  const chipClass = isHighlighted ? "bg-yellow-300" : "bg-gray-300";
  return (
    <div className="flex">
      <div
        className={`ml-4 flex flex-row bg-gray-300 rounded-2xl pr-3 justify-center items-center hover:bg-gray-200 ${chipClass}`}
      >
        <img src={user?.avatar} alt="Avatar" className="h-8 w-8 rounded-full" />
        <h1 className="mr-2 pl-2 font-semibold">{user?.label}</h1>
        <img
          src={xMark}
          alt="Cross Icon"
          className="h-5 w-5"
          onClick={handleRemoveOption}
        />
      </div>
    </div>
  );
};

export default Chip;
