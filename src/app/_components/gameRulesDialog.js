import React, { useRef } from 'react';

function GameRulesDialog({ resetGame }) {
  const dialogRef = useRef(null);
  const mariansRuleRef = useRef(null);

  const openDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  return (
    <div className="text-gray-800 cursor-pointer text-sm md:text-lg border-2 border-blue-300 w-8 h-8 md:h-12 md:w-12 rounded-full content-center">
      <button onClick={openDialog} className="w-full h-full rounded-full">
        i
      </button>

      <dialog
        ref={dialogRef}
        className="bg-white p-4 rounded shadow-lg w-11/12 md:w-2/3"
      >
        <nav>
          <button
            className="bg-blue-500 w-1/2 mx-auto my-4 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => {
              window.location.reload();
            }}
          >
            Refresh Game
          </button>
        </nav>

        <div onClick={closeDialog}>
          <h2 className="text-2xl font-bold mb-4">Card Game Rules</h2>
          <p className="mb-4">
            Welcome to a solitaire version of The Game! Here are the basic
            rules:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              The goal of this game is to place all 98 shuffled cards, each
              uniquely labeled 2-99.
            </li>
            <li>
              Select the card from your "hand" and then the pile to place the
              card on.
            </li>
            <li>Of the four piles</li>
            <li>
              "+" require a card with higher value
              <span className="relative -top-1">*</span>
            </li>
            <li>
              "-" require a card with lower value than piles displayed value
              <span className="relative -top-1">*</span>
            </li>
            <li>
              A special move can be made, allowing you to add a lower or higher
              card on an addition/subtraction pile. If you play a card that is
              exactly 10 away of the displayed pile value.
            </li>
            <li>
              You will be cyling through two hands of cards, always recieving
              random cards from the 98 card deck.
            </li>
            <li>
              Each round you will begin with six (6) cards that can be played.
              You must play at least 2 cards before you can move to you next
              hand. The current hand is displayed for each round.
            </li>
            <li>
              The highest card wins the round, and the player with the most
              round wins is the overall winner.
            </li>
            <li>
              If there is a tie in a round, the tied players draw a new card and
              play again.
            </li>
          </ul>

          <div className="mt-6">
            <label className="inline-flex items-center">
              <span className="ml-2 text-gray-700 mx-4">
                Play w/ Marian's rule?
              </span>
              <input
                type="checkbox"
                ref={mariansRuleRef}
                className="form-checkbox h-5 w-5 text-blue-600
         "
                disabled
              />
            </label>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Marian's Rule:</strong> Instead of "rolling back 10 from a
              given position, you can now also roll back 20. e.g. a subtraction
              pile displaying 70 can now be rolled back to 80, or 90 if those
              cards are played".
            </p>
          </div>
        </div>

        {/* <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-green-700 focus:outline-none"
          onClick={closeDialog}
        >
          Close
        </button> */}
      </dialog>
    </div>
  );
}

export default GameRulesDialog;
