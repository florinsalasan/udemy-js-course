'use strict';

// from playing the final version quickly, a player rolls a dice until they either roll a 1 or decide to 'bank' their rolls. If they roll a 1 before banking the points they've accumulated that turn go to 0 and do not get added to their total. First player to get to a total banked score of over 100 wins.

// elements that will be needed 
let curPlayer = document.querySelector('.player--active')
let curPlayerTurnScore = curPlayer.querySelector('.current-score')
let curPlayerTotal = curPlayer.querySelector('.score')
let players = document.querySelectorAll('.player')

let totalScores = document.querySelectorAll('.score')
let currentScores = document.querySelectorAll('.current-score')

const newGameBtn = document.querySelector('.btn--new')
const rollBtn = document.querySelector('.btn--roll')
const bankBtn = document.querySelector('.btn--hold')

let playingButtons = [rollBtn, bankBtn]

// let player = curPlayer;
let current = 0 // will be reset on switching players or rolling a 1

// Event listener for dice roll button
rollBtn.addEventListener('click', function () {

  let roll = Math.ceil(Math.random() * 6)
  console.log(roll)
  if (roll !== 1) {
    current += roll;
  } else {
    // current = 0;
    swapActivePlayer()
    // return
  }

  document.querySelector('.dice').setAttribute('src', `dice-${roll}.png`)

  curPlayerTurnScore.innerHTML = current
  return
})


// Event listener for the 'hold' button
bankBtn.addEventListener('click', function () {
  curPlayerTotal.innerHTML = Number(curPlayerTotal.innerHTML) + Number(curPlayerTurnScore.innerHTML)

  if (Number(curPlayerTotal.innerHTML) >= 20) {
    curPlayer.classList.toggle('player--active')
    curPlayer.classList.add('player--winner')

    for (let i = 0; i < playingButtons.length; i++) {
      playingButtons[i].classList.add('inactive')
    }
  }

  // curPlayerTurnScore = 0
  // curPlayerTurnScore.innerHTML = 0

  swapActivePlayer()
})


// Event listener to start new game
newGameBtn.addEventListener('click', function () {

  // should probably DRY this by making it a toggle in a separate function and adding a check to see if inactive is in the classList instead of having this in two spots as add / remove
  for (let i = 0; i < playingButtons.length; i++) {
    playingButtons[i].classList.remove('inactive')
  }
  current = 0;

  for (let i = 0; i < players.length; i++) {
    // remove whoever the winner is, if there was no winner, don't think it should throw an error but we'll see
    players[i].classList.remove('player--winner')
    // remove active player class from both so that we can't have a situation where both players will have the tag synced as the swap player helper toggles the class, works well for active moves, simpler to brute it on new game though
    players[i].classList.remove('player--active')

    totalScores[i].innerHTML = 0
    currentScores[i].innerHTML = 0
  }

  // make player--1 the active player then swap to refresh the selector
  document.querySelector('.player--1').classList.add('player--active')
  swapActivePlayer()

})


// helper function to swap active player
function swapActivePlayer() {

  current = 0

  curPlayerTurnScore.innerHTML = 0

  for (let i = 0; i < players.length; i++) {
    players[i].classList.toggle('player--active')
  }

  curPlayer = document.querySelector('.player--active')

  curPlayerTurnScore = curPlayer.querySelector('.current-score')
  curPlayerTotal = curPlayer.querySelector('.score')

}