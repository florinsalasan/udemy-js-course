"use strict"

// CHALLENGE 1

// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
// A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!
// Your tasks:
// 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
// 2. Use the function to calculate the average for both teams
// 3. Create a function 'checkWinner' that takes the average score of each team
// as parameters ('avgDolphins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above. Example: "Koalas win (30 vs. 13)"
// 4. Use the 'checkWinner' function to determine the winner for both Data1 and Data 2
// 5. Ignore draws this time
// Test data:
// § Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49 § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

console.log('CHALLENGE 1')

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3

function checkWinner(avgDolphins, avgKoalas) {
  let opponents = ['avgDolphins', 'avgKoalas']
  let better;
  if (avgKoalas >= 2 * avgDolphins) {
    better = 'avgKoalas'
    // opponents.pop('koalas')
  } else if (avgDolphins >= 2 * avgKoalas) {
    better = 'avgDolphins'
    // opponents.pop('dolphins')
  } else {
    console.log('There was no winner based on the rules provided')
    return
  }

  let betterIndex = opponents.indexOf(better)
  const worse = betterIndex === 0 ? 1 : 0;
  const betterScore = better === opponents[0] ? avgDolphins : avgKoalas
  const worseScore = worse === opponents[0] ? avgDolphins : avgKoalas
  console.log(`${better.slice(3)} win (${betterScore} vs. ${worseScore})`)

}

const winner1 = checkWinner(calcAverage(44, 23, 71), calcAverage(65, 54, 49))
const winner2 = checkWinner(calcAverage(85, 54, 41), calcAverage(23, 34, 27))


// CHALLENGE 2

// Steven is still building his tip calculator, using the same rules as before: Tip 15% of the bill if the bill value is between 50 and 300, and if the value is different, the tip is 20%.
// Your tasks:
// 1. Write a function 'calcTip' that takes any bill value as an input and returns the corresponding tip, calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). Use the function type you like the most. Test the function using a bill value of 100
// 2. And now let's use arrays! So create an array 'bills' containing the test data below
// 3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before
// 4. Bonus: Create an array 'total' containing the total values, so the bill + tip Test data: 125, 555 and 44

console.log("CHALLENGE 2")

function calcTip(billValue) {
  let total = billValue >= 30 && billValue <= 500 ? billValue * 0.15 : billValue * 0.2;
  return total.toFixed(2);
}

const bills = [125, 555, 44]
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]
const total = [bills[0] + Number(tips[0]), bills[1] + Number(tips[1]), bills[2] + Number(tips[2])]
console.log(bills, tips, total)


// CHALLENGE 3

// Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)
// Your tasks:
// 1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
// 2. Create a 'calcBMI' method on each object to calculate the BMI(the same method on both objects). Store the BMI value to a property, and also return it from the method
// 3. Log to the console who has the higher BMI,together with the full name and the respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
// Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

console.log("CHALLENGE 3")

let markObj = {
  'fullName': 'Mark Miller',
  'mass': 78,
  'height': 1.69,
  calcBMI() {
    return this.mass / (this.height ** 2)
  },
}
markObj.bmi = markObj.calcBMI().toFixed(2)

let johnObj = {
  'fullName': 'John Smith',
  'mass': 92,
  'height': 1.95,
  calcBMI: function () {
    return (this.mass / (this.height ** 2))
  },
}
johnObj.bmi = johnObj.calcBMI().toFixed(2)

let buddies = [markObj, johnObj]
// change order of buddies so that highest comes first
// markObj.bmi = 100
// johnObj.bmi = 1000
if (markObj.bmi < johnObj.bmi) {
  buddies.reverse()
}

console.log(`${buddies[0].fullName}'s BMI (${buddies[0].bmi}) is higher than ${buddies[1].fullName}'s (${buddies[1].bmi})!`)