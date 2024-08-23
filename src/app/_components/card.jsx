// components/Card.js
import React, { useState } from 'react';

const Card = ({ value, isSelected, onClick }) => {
  let [hovered, setHovered] = useState(false);
  return (
    <div
      className={`card ${
        isSelected ? 'cardselected shadow-none ' : ''
      } w-2/12 h-24 shadow-inner shadow-slate-400
      bg-blue-50
      md:text-2xl text-lg md:h-48 md:w-1/12 py-12 px-4 border-2  border-gray-200 rounded-md flex justify-center items-center font-bold cursor-pointer  ${
        isSelected
          ? 'bg-selected-card text-gray-900 underline border-2 -translate-y-[5px] scale-110 bg-gray-400 shadow-lg shadow-slate-500'
          : 'bg-card-background shadow-lg shadow-slate-500'
      }
      ${hovered && 'bg-blue-200 -translate-y-1'}`}
      onClick={() => onClick(value)}
      onMouseOver={() => setHovered(true && !isSelected)}
      onMouseLeave={() => setHovered(false)}
    >
      {value}
    </div>
  );
};

export default Card;
