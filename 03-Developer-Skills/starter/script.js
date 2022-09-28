// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// Coding Challenge 1


// Given an array of forecasted maximum temperatures, the thermometer displays a string with the given temperatures. Example: [17, 21, 23] will print "... 17oC in 1 days ... 21oC in 2 days ... 23oC in 3 days ..."
// Your tasks:
// 1. Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console. Try it with both test datasets.
// 2. Use the problem-solving framework: Understand the problem and break it up into sub-problems!
// Test data:
// § Data 1: [17, 21, 23]
// § Data2:[12,5,-5,0,4]

console.log("CODING CHALLENGE 1")

const printForecast = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(`${arr[i]}°C in ${i + 1} days`)
  }
}

printForecast([17, 21, 23])
printForecast([12, 5, -5, 0, 4])

// if he meant collecting all forecasts into one string and then printing to console, use printForecast2

const printForecast2 = (arr) => {
  let builder = "... "
  for (let i = 0; i < arr.length; i++) {
    builder = builder.concat(`${arr[i]}°C in ${i + 1} days`)
    builder = builder.concat(" ... ")
  }
  console.log(builder)
}

printForecast2([17, 21, 23])
printForecast2([12, 5, -5, 0, 4])