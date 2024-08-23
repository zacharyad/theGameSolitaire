'use client';
import React from 'react';
import Card from './card.jsx';

const PlayerCardArea = ({
  cardsArr,
  playersHandIdentifier,
  handleCardSelect,
  deckCount,
  currSelectedCard,
}) => {
  return (
    <div id="playerCardArea" className="flex flex-col items-center gap-6 my-8">
      <p className="text-xl font-bold">
        <span id="cardsLeftMsg"></span> Cards Left: {deckCount}
      </p>
      <p className="text-xl font-bold">
        Player&apos;s Hand: <span>{playersHandIdentifier}</span>
      </p>

      <div
        id="playersCardContainer"
        className="flex flex-wrap justify-center gap-8 w-5/6 md:w-full rounded-lg"
      >
        {cardsArr.length > 0 &&
          cardsArr.map((cardVal, idx) => {
            return (
              <Card
                value={cardVal}
                isSelected={currSelectedCard === cardVal}
                key={playersHandIdentifier + idx}
                onClick={handleCardSelect}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PlayerCardArea;
