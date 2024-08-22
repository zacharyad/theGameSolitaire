'use client';
import { useState } from 'react';
const Pile = ({
  value,
  isViable,
  onClick,
  currentCard,
  isEasyMode = true,
  pileIdx,
}) => {
  let [colorState, setColorState] = useState(0);
  let colorStates = [
    '',
    'bg-selected-card text-blue-400 shadow-md -translate-y-[5px] scale-110 bg-green-200',
    'bg-red-200 text-red-800',
  ];

  return (
    <div
      className={`${colorStates[colorState]} card w-1/4 h-40
      md:text-4xl text-lg md:h-64 sm:w-1/6 border-2 flex-col bg-blue-50  border-gray-700 rounded-md flex justify-center items-center font-bold cursor-pointer transition-all duration-50 ease-out`}
      onMouseEnter={() => setColorState(isViable(currentCard, pileIdx) ? 1 : 2)}
      onMouseLeave={() => setColorState(0)}
      onClick={onClick}
    >
      {pileIdx < 2 ? '+' : '-'}
      {value}
    </div>
  );
};

export default Pile;
