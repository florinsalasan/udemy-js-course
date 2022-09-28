'use strict';

// collection of elements that we want targeted for future use
let guessBtn = document.querySelector(".check")
let guessValue = document.querySelector(".guess")
let curScore = document.querySelector('.score')
let highScore = document.querySelector('.highscore')
let restartBtn = document.querySelector(".again")
let hintText = document.querySelector('.message')

let hiddenNum = document.querySelector('.number')

// creates a randomized target number for the user to guess.
let targetNumber = Math.ceil(Math.random() * 20)

console.log(targetNumber)
console.log(guessBtn, guessValue.value)


// This allows the check button to actively compare the user inputted number against the randomly generated number
guessBtn.addEventListener('click', function higherLower() {

  // guessValue
  let num = guessValue.value
  let targNum = targetNumber

  let score = curScore.innerHTML
  let hScore = highScore.innerHTML

  console.log(`guessValue: ${num}; targetNum: ${targNum}`)

  hintText.classList.add('multiline')

  if (num > 20 || num < 1) {
    hintText.innerHTML = 'Your guess is out of bounds! Try a number between 1 and 20!'
  }
  else if (num == targNum) {
    hintText.innerHTML = `You won w/ a score of ${score}!`
    if (score > hScore) {
      highScore.innerHTML = score
    }
    guessBtn.classList.toggle('disabled')
    guessBtn.innerHTML = 'You won!'
    document.querySelector('body').classList.toggle('won')
    hiddenNum.innerHTML = targNum.toString()
    return
  } else {
    let hL = num < targNum ? 'lower' : 'higher'
    curScore.innerHTML -= 1
    if (curScore.innerHTML == 0) {
      hintText.innerHTML = 'You lost! Try again?'
      document.querySelector('body').classList.toggle('lost')
      guessBtn.classList.toggle('disabled')
      guessBtn.innerHTML = 'You lost!'
      return
    }
    console.log(hL)
    hintText.innerHTML = `Your guess was ${hL} than the target, try again!`
  }
})

restartBtn.addEventListener('click', function restart() {

  targetNumber = Math.ceil(Math.random() * 20)

  curScore.innerHTML = 20

  guessBtn.classList.remove('disabled')
  guessBtn.innerHTML = 'Check!'

  hiddenNum.innerHTML = '?'

  document.querySelector('body').classList.remove('won')
  document.querySelector('body').classList.remove('lost')
})