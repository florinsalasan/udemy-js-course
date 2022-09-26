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

console.log("CHALLENGE 1")
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

console.log("CHALLENGE 2")
// First set of measurements
improvedBMIComparison(markWeightOne, markHeightOne, johnWeightOne, johnHeightOne)

// Second set of measurements
improvedBMIComparison(markWeightTwo, markHeightTwo, johnWeightTwo, johnHeightTwo)

//CHALLENGE 3
// There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins a trophy!
// Your tasks:
// 1. Calculate the average score for each team,using the test data below
// 2. Compare the team's average scores to determine the winner of the competition,
// and print it to the console. Don't forget that there can be a draw, so test for that
// as well (draw means they have the same average score)
// 3. Bonus1: Include a requirement for a minimum score of 100. With this rule, a
// team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. Hint: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
// 4. Bonus2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy
// Test data:
// § Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
// § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123 § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

function winningTeam(dolphin1, dolphin2, dolphin3, koala1, koala2, koala3) {
  avgDolphin = (dolphin1 + dolphin2 + dolphin3) / 3
  avgKoala = (koala1 + koala2 + koala3) / 3

  if (avgDolphin > avgKoala) {
    console.log(`The dolphins beat the koalas with a final score of ${avgDolphin.toFixed(2)} to ${avgKoala.toFixed(2)}!`)
  } else if (avgDolphin === avgKoala) {
    console.log(`The dolphins tied the koalas with a final score of ${avgDolphin.toFixed(2)}`)
  } else {
    console.log(`The dolphins lost to the koalas with a final score of ${avgDolphin.toFixed(2)} to ${avgKoala.toFixed(2)}!`)
  }
}

console.log("CHALLENGE 3")
winningTeam(96, 108, 89, 88, 91, 110)
winningTeam(97, 112, 101, 109, 95, 123)
winningTeam(97, 112, 101, 109, 95, 106)

function winningTeamBonuses(dolphin1, dolphin2, dolphin3, koala1, koala2, koala3, min_score) {
  avgDolphin = (dolphin1 + dolphin2 + dolphin3) / 3
  avgKoala = (koala1 + koala2 + koala3) / 3

  if (avgDolphin > avgKoala && avgDolphin > min_score) {
    console.log(`The dolphins beat the koalas with a final score of ${avgDolphin.toFixed(2)} to ${avgKoala.toFixed(2)}!`)
  } else if (avgDolphin === avgKoala && avgDolphin > min_score) {
    console.log(`The dolphins tied the koalas with a final score of ${avgDolphin.toFixed(2)}`)
  } else if (avgDolphin < avgKoala && avgKoala > min_score) {
    console.log(`The dolphins lost to the koalas with a final score of ${avgDolphin.toFixed(2)} to ${avgKoala.toFixed(2)}!`)
  } else {
    console.log(`Neither team had a score that was higher than the minimum required, ${min_score}, and as a result nobody has won the trophy`)
  }
}

winningTeamBonuses(96, 108, 89, 88, 91, 110, 100)
winningTeamBonuses(97, 112, 101, 109, 95, 123, 100)
winningTeamBonuses(97, 112, 101, 109, 95, 106, 100)