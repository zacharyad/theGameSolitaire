'use client';
import React, { useState, useRef } from 'react';
import Game from './game';
import Header from './_components/header';

export default function Home() {
  const [isStarting, setIsStarting] = useState(true);
  const [playWithMariansRule, setMariansRule] = useState(false);
  const mariansRuleRef = useRef(null);

  function handleStartGame(e) {
    e.preventDefault();
    setIsStarting(false);
    setMariansRule(mariansRuleRef.current.checked);
  }

  return (
    <main
      className={`font-body flex flex-col p-4 w-full h-screen bg-gray-50 text-gray-800`}
    >
      <div
        className={`${
          isStarting ? 'pointer-events-none opacity-25 blur-sm' : ''
        } flex flex-col`}
      >
        <Header
          isStarting={isStarting}
          playWithMariansRule={playWithMariansRule}
          resetGame={() => setIsStarting(true)}
        />
        <Game
          resetGame={() => setIsStarting(true)}
          playWithMariansRule={playWithMariansRule}
        />
      </div>
      {isStarting && (
        <div className="p-8 h-2/6  bg-slate-100 shadow-2xl shadow-slate-900 text-gray-800 fixed bottom-0 left-0 right-0">
          <h1 className="fixed top-1/3 mx-auto left-1/2 -translate-x-1/2 text-8xl text-grey-700 backdrop-blur-md">
            The Game
          </h1>
          <form
            onSubmit={handleStartGame}
            className=" h-full flex flex-col justify-around"
          >
            <button
              onClick={() => setIsStarting(true)}
              className="bg-blue-500 w-3/4 md:w-1/6 mx-auto hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
            >
              Start Game
            </button>
            <div className="mx-auto flex gap-2 mt-8 items-end">
              <label htmlFor="mariandRuleCheckbox">
                Play w/ Marian&apos;s rule?
              </label>
              <input
                name="mariandRuleCheckbox"
                checked={playWithMariansRule}
                onChange={() => setMariansRule((prev) => !prev)}
                type="checkbox"
                ref={mariansRuleRef}
                className="h-8 w-8"
              />
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
