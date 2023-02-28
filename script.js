'use strict';
// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore1, activePlayer, gameOn;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore1 = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};
const init = function () {
  diceEl.classList.add('hidden');
  gameOn = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores = [0, 0];
  currentScore1 = 0;
  activePlayer = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

btnNew.addEventListener('click', init);

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (gameOn) {
    // 1.Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. check for rolled 1 : if true swithc to player 2
    if (dice !== 1) {
      // add dice to current score
      currentScore1 += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore1;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gameOn) {
    //1.add current score to active player's score
    scores[activePlayer] += currentScore1;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 69) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--winner');
      gameOn = false;
      diceEl.classList.toggle('hidden');
    } else {
      switchPlayer();
    }
    //2.check if players score >=69
    // finish the game

    // switch to the next player
  }
});

const main = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.remove('overlay');
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
