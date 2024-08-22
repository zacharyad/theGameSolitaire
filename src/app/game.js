'use client';
import React, { useEffect, useState } from 'react';
import PlayerCardArea from './_components/playerCardArea';
import Pile from './_components/pile';

const Game = ({ resetGame, playWithMariansRule }) => {
  const [numPlayersHands, _] = useState(2);
  const [piles, setPiles] = useState([1, 1, 100, 100]);
  const [turn, setTurn] = useState(0);
  const [cardsLeft, setCardsLeft] = useState(98);
  const [errorMsg, setErrorMsg] = useState({ msg: '', color: '' });
  const [playersHands, setPlayersHands] = useState([]);
  const [currHandPlaying, setCurrHandPlaying] = useState([]);
  const [currCardSelected, setCurrCardSelected] = useState(undefined);
  const [canPlaceCard, setCanPlaceCard] = useState(false);
  const [turnsPlayedCardsCount, setTurnsPlayedCardsCount] = useState(0);
  const [deck, setDeck] = useState(createShuffledDeck());
  const [isEasyMode, setIsEasyMode] = useState(false);
  const niceMsgs = ['NICE', 'OH YEAH', 'Sweet move, homie'];

  useEffect(() => {
    init();
  }, []);

  function init() {
    const playersHandsArr = [];

    for (let i = 1; i <= numPlayersHands; i++) {
      playersHandsArr.push(handleDealingCardsToPlayer([], 6));
    }

    setPlayersHands(playersHandsArr);
  }

  function handleDealingCardsToPlayer(playersHand, qtyOfCardsToDeal) {
    for (let i = 0; i < qtyOfCardsToDeal; i++) {
      let cardToDeal = deck.pop();
      playersHand.push(cardToDeal);
    }

    return playersHand.sort((a, b) => a - b);
  }

  function createShuffledDeck() {
    let deck = Array(98);

    for (let i = 0; i < deck.length; i++) {
      deck[i] = i + 2;
    }

    for (let j = deck.length - 1; j >= 0; j--) {
      let swapIndex = Math.floor(Math.random() * j);
      let tmp = deck[swapIndex];
      deck[swapIndex] = deck[j];
      deck[j] = tmp;
    }

    deck.push(...[70, 80, 90]);

    return deck;
  }

  function handleTurnEnd() {
    dealAtEndOfTurn();
    setCurrCardSelected(undefined);
    setErrorMsg({ msg: '', color: '' });
    setTurnsPlayedCardsCount(0);
    advTurn();
  }

  function advTurn() {
    let tmpTurn = turn + 1;
    if (tmpTurn >= numPlayersHands) {
      tmpTurn = 0;
    }
    setTurn(tmpTurn);
  }

  function handleSettingCurrSelectCard(cardVal) {
    setCurrCardSelected(cardVal);
    setErrorMsg({ msg: '', color: '' });
  }

  function dealAtEndOfTurn() {
    if (playersHands[turn].length == 6) return;
    let newCardsFromDeck = newHandWithCardsPoppedFromDeck();

    setPlayersHands((prev) => {
      let newHands = prev;
      newHands[turn] = newCardsFromDeck.sort((a, b) => a - b);
      return newHands;
    });
  }

  function updatePlayersHand() {
    let updatedHand = playersHands[turn].filter((cardVal) => {
      return cardVal != currCardSelected;
    });

    playersHands[turn] = updatedHand;

    setPlayersHands(playersHands);
  }

  function newHandWithCardsPoppedFromDeck() {
    let poppedArr = [];
    for (let i = 1; i <= turnsPlayedCardsCount; i++) {
      let popped = deck[deck.length - i];
      poppedArr.push(popped);
    }

    setDeck(deck.slice(0, deck.length - poppedArr.length));

    return [...playersHands[turn], ...poppedArr];
  }

  function handleSelectingPileAndCardPlacement(idx) {
    if (currCardSelected == undefined) {
      setErrorMsg({
        msg: 'Select a card from your hand before selecting a pile.',
        color: 'red',
      });
      return;
    }

    if (canPlaceCardOnPile(currCardSelected, idx)) {
      let newPiles = piles;
      newPiles[idx] = currCardSelected;
      setPiles(newPiles);
      updatePlayersHand();
      setTurnsPlayedCardsCount((prev) => prev + 1);
      setCardsLeft((prev) => prev - 1);
      setCurrCardSelected(undefined);
    } else {
      setErrorMsg({ msg: 'Not a valid move', color: 'red' });
      return;
    }
  }

  function getNiceMessage() {
    return niceMsgs[Math.floor(Math.random() * niceMsgs.length)];
  }

  function canPlaceCardOnPile(cardVal, pileIdx) {
    // logic to test the possible outcomes for a card being placed on a given pile
    if (pileIdx < 2) {
      console.log('start of add pile');
      if (piles[pileIdx] - cardVal === 10) {
        console.log('diff of 10');
        setErrorMsg((prev) => ({ ...prev, msg: getNiceMessage() }));
        return true;
      }

      if (playWithMariansRule && piles[pileIdx] - cardVal === 20) {
        console.log('diff of 20');
        setErrorMsg((prev) => ({ ...prev, msg: 'Marian would be proud!' }));
        return true;
      }

      return piles[pileIdx] < cardVal ? true : false;
    } else {
      if (cardVal - piles[pileIdx] === 10) {
        console.log('diff of 10');
        setErrorMsg((prev) => ({ ...prev, msg: getNiceMessage() }));
        return true;
      }
      if (playWithMariansRule && cardVal - piles[pileIdx] === 20) {
        console.log('diff of 20');
        setErrorMsg((prev) => ({ ...prev, msg: 'Marian would be proud!' }));
        return true;
      }

      return piles[pileIdx] > cardVal ? true : false;
    }
  }

  // function testIfWonOrLostBeforeHand() {
  //   let p1 = 0;
  //   let p2 = 0;

  //   while (p2 < currHandPlaying.length) {}
  // }

  if (cardsLeft === 0) {
    console.log('Winner');
    return (
      <div className="flex flex-col gap-2 justify-center  m-auto items-center">
        <h1>YOU Won!</h1>
        <button
          onClick={resetGame}
          className="bg-blue-500 w-full mx-auto  hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
        >
          Play Again?
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2 justify-between mt-24">
        <div className="flex gap-2 justify-between ">
          {piles.map((pileVal, idx) => {
            return (
              <Pile
                value={pileVal}
                key={idx}
                pileIdx={idx}
                onClick={() => handleSelectingPileAndCardPlacement(idx)}
                isViable={canPlaceCardOnPile}
                currentCard={currCardSelected}
              />
            );
          })}
        </div>
      </div>

      {playersHands[turn] && (
        <PlayerCardArea
          key={turn}
          cardsArr={playersHands[turn]}
          playersHandIdentifier={turn}
          handleCardSelect={handleSettingCurrSelectCard}
          deckCount={cardsLeft}
          currSelectedCard={currCardSelected}
        />
      )}

      {turnsPlayedCardsCount >= 2 ? (
        <button
          className="bg-blue-500 w-1/4 mx-auto hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
          onClick={handleTurnEnd}
        >
          End Turn
        </button>
      ) : (
        <button
          className={`${
            turnsPlayedCardsCount < 2 ? 'display-none' : ''
          } opacity-0 font-medium py-3 px-6 justify-self-center`}
        >
          End Hand
        </button>
      )}
      <div className="h-20 p-4 text-md md:text-lg font-mono font-semibold mx-auto text-center">
        {errorMsg.msg ? (
          <p
            className={`${
              errorMsg.color !== 'red' ? 'text-green-600' : 'text-red-500'
            } text-lg`}
          >
            {errorMsg.msg}
          </p>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Game;
