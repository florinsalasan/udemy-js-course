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
