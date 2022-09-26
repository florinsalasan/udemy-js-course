// CHALLENGE 1
// Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).
// Your tasks:
// 1. Store Mark's and John's mass and height in variables
// 2. Calculate both their BMIs using the formula(you can even implement both
// versions)
// 3. Create a Boolean variable 'markHigherBMI' containing information about
// whether Mark has a higher BMI than John.
// Test data:
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.

let markWeightOne = 78
let markHeightOne = 169 //in cm
let johnWeightOne = 92
let johnHeightOne = 195 //in cm

let markWeightTwo = 95
let markHeightTwo = 188 //in cm
let johnWeightTwo = 85
let johnHeightTwo = 176 //in cm

function calcBMI(weight, height) {
  return weight / ((height / 100) ** 2)
}

let markBMIOne = calcBMI(markWeightOne, markHeightOne)
let markBMITwo = calcBMI(markWeightTwo, markHeightTwo)

let johnBMIOne = calcBMI(johnWeightOne, johnHeightOne)
let johnBMITwo = calcBMI(johnWeightTwo, johnHeightTwo)

let markHigherBMI = markBMIOne > johnBMIOne
console.log(markHigherBMI)

markHigherBMI = markBMITwo > johnBMITwo
console.log(markHigherBMI)


// CHALLENGE 2
// Use the BMI example from Challenge #1, and the code you already wrote, and improve it.
// Your tasks:
// 1. Print a nice output to the console,saying who has the higher BMI. The message is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
// 2. Use a template literal to include the BMI values in the outputs. Example:"Mark's BMI (28.3) is higher than John's (23.9)!"
// Hint: Use an if/else statement 😉 GOOD LUCK 😀

function improvedBMIComparison(weight1, height1, weight2, height2) {
  let markBMI = calcBMI(weight1, height1)
  let johnBMI = calcBMI(weight2, height2)

  if (markBMI > johnBMI) {
    console.log(`Mark's BMI (${markBMI.toFixed(1)}) is higher than John's (${johnBMI.toFixed(1)})!`)
  }
  else {
    console.log(`Mark's BMI (${markBMI.toFixed(1)}) is lower than John's (${johnBMI.toFixed(1)})!`)
  }
}

// First set of measurements
improvedBMIComparison(markWeightOne, markHeightOne, johnWeightOne, johnHeightOne)

// Second set of measurements
improvedBMIComparison(markWeightTwo, markHeightTwo, johnWeightTwo, johnHeightTwo)