// CHALLENGE 1

// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter 'poll' object below.
// Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
// 1.1. Display a prompt window for the user to input the number of the
// selected option. The prompt should look like this: What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)
// 1.2. Based on the input number, update the 'answers' array property. For example, if the option is 3, increase the value at position 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g. answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answerpoll" button.
// 3. Create a method 'displayResults' which displays the poll results. The
// method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
// 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?

// Test data for bonus:
// § Data1:[5,2,3]
// § Data2:[1,5,3,9,6,1]



const poll = {
  question: "What is your favourite programming language?", options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section! 
  answers: new Array(4).fill(0),
};

console.log('CHALLENGE 1')

poll.registerNewAnswer = function () {
  console.log(this)
  let response = prompt(`${poll.question} select from the following: \n${poll.options.join('\r\n')} \n (Write in the option number please)`)

  let optionValues = [...Array(4).keys()]
  console.log(optionValues.includes(Number(response)))

  let response2 = -1
  if (!optionValues.includes(Number(response))) {
    while (!optionValues.includes(Number(response2))) {
      response2 = prompt(`Your answer was not one of the listed options, please select an option from the list below. \n\n${poll.question} select from the following: \n${poll.options.join('\r\n')} \n (Write in the option number please)`)
    }
  }

  response2 !== -1 ? addValue(response2) : addValue(response)

  console.log(poll.answers)
  this.displayResults('string')
  this.displayResults('other')
}

// generalize with this keyword, otherwise cannot use call method to display answers that are not in poll object
poll.displayResults = function (type) {
  if (type === 'string') {
    console.log(`Poll results are ${this.answers.join(', ')}.`)
  } else {
    console.log(this.answers)
  }
}

function addValue(value) {
  poll.answers[value]++
}

// bind the this keyword to poll so that the event listener will target the poll object when the user interacts with it as intended.
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))

// call the method with set answers
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3] }, 'other');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });


// CHALLENGE 2

// This is more of a thinking challenge than a coding challenge 🤓 Your tasks:
// 1. Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element is clicked. Do not select the h1 element again!
// 2. And now explain to yourself (or someone around you) why this worked! Take all the time you need. Think about when exactly the callback function is executed, and what that means for the variables involved in this example.

; (function () {
  const header = document.querySelector('h1'); header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue'
  })
})();

// this works through the closure, even though the iife is gone and the environment isn't active anymore, the eventListener 'remembers' the header variable and can target it when it's eventListener is procced. At least I think that's why, will read more into closure in js as I progress through the course.