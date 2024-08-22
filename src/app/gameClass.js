'use client';
class Game {
  constructor() {
    this.totalHands = 2;
    this.piles = [1, 1, 100, 100];
    this.turn = 0;
    this.playersHands = [];
    this.currHand = [];
    this.currCardSelected = undefined;
    this.canPlaceCard = false;
    this.currCardsPlayedThisHand = 0;
    this.deck = [];
    this.remainingCards = 0;
    this.isMariansRuleApplied = false;
    this.isEasyMode = false;
  }

  gameInit() {
    this.deck = this.shuffleAndGiveDeck();
    this.remainingCards = this.deck.length;

    for (let i = 0; i < this.totalHands; i++) {
      this.playersHands.push([]);
      this.dealCardsToPlayer(i, 6);
      this.playersHands[i].sort((a, b) => a - b);
    }

    this.currHand = this.playersHands[this.turn];
    return this;
  }

  endTurn() {
    // advance to next turn (player hand)
    this.turn++;
    //cycle back to first player hand
    if (this.turn >= this.totalHands) {
      this.turn = 0;
    }
    // reset for next turn
    this.currHandsCardsLaid = 0;
    this.currCardSelected = undefined;
    this.currHand = this.playersHands[this.turn];
    this.currCardSelected = undefined;
    this.dealCardsToPlayer(this.turn, this.currHandsCardsLaid);
    this.playersHands[this.turn].sort((a, b) => a - b);
  }

  placeCardSelectedCard(selectedPileIdx) {
    this.currHandsCardsLaid += 1;

    if (this.currHandsCardsLaid >= 2) {
      this.resetBtnElem.disabled = false;
    }

    this.piles[selectedPileIdx] = this.currCardSelected;
    this.playersHands[this.turn] = this.playersHands[this.turn].filter(
      (elem) => {
        return elem !== this.currCardSelected;
      }
    );
  }

  canPlaceCardOnPile(cardVal, pileIdx) {
    // logic to test the possible outcomes for a card being placed on a given pile
    if (pileIdx < 2) {
      if (
        this.piles[pileIdx] - cardVal === 10 ||
        (this.isMariansRuleApplied && this.piles[pileIdx] - cardVal === 20)
      ) {
        return true;
      }
      return this.piles[pileIdx] < cardVal ? true : false;
    } else {
      if (
        cardVal - this.piles[pileIdx] === 10 ||
        (this.isMariansRuleApplied && cardVal - this.piles[pileIdx] === 20)
      ) {
        return true;
      }
      return this.piles[pileIdx] > cardVal ? true : false;
    }
  }

  dealCardsToPlayer(player, cardsToDeal) {
    for (let i = 0; i < cardsToDeal; i++) {
      let cardToDeal = this.deck.pop();
      this.playersHands[player].push(cardToDeal);
    }

    this.playersHands[player].sort((a, b) => a - b);

    return this.playersHands[player];
  }

  shuffleAndGiveDeck() {
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
    return deck;
  }
}

export default Game;
