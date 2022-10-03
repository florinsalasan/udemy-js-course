// CHALLENGE 1

// We're building a football betting app (soccer for my American friends 😅)!
// Suppose we get data from a web service about a certain game ('game' variable on next page). In this challenge we're gonna work with that data.
// Your tasks:
// 1. Create one player array for each team (variables 'players1' and 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object,create one variable for each odd(called 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals')that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator.
// Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// the game object:

const game = {
  team1: 'Bayern Munich', team2: 'Borrussia Dortmund', players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ], [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
    'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

console.log('CHALLENGE 1')

let players1 = game.players[0]
let players2 = game.players[1]

let gk = players1[0]
let fieldPlayers = players1.slice(1)
console.log(gk, fieldPlayers)

let allPlayers = [...players1, ...players2]
console.log(allPlayers)

let players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic']
console.log(players1Final)

let [team1, draw, team2] = [game.odds.team1, game.odds.x, game.odds.team2]
console.log(team1, draw, team2)

function printGoals(...other) {
  for (let i = 0; i < other.length; i++) {
    console.log(other[i])
  }
  console.log(other.length)
}

printGoals('Lewandowski', 'Gnabry', 'Lewandowski', 'Hummels')

//using short circuiting to print out the team with smaller odds - checks if team1 has higher odds than team2, if it doesn;t it short circuits and does not print team2, going on to print team1
console.log((game.odds.team1 > game.odds.team2 && game.team2) || game.team1)

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich')



// CHALLENGE 2

// Let's continue with our football betting app! Keep using the 'game' variable from before.
// Your tasks:
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33 Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names 😉
// 4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//      {
//        Gnarby: 1,
//        Hummels: 1,
//        Lewandowski: 2
// }

console.log('CHALLENGE 2')

for (let i = 0; i < game.scored.length; i++) {
  console.log(`Goal ${i + 1}: ${game.scored[i]}`)
}

let odd_total = 0
for (const odd in game.odds) {
  odd_total = odd_total + game.odds[odd]

}

console.log(odd_total)
// console.log(Object.keys(game.odds).)
console.log(`${(odd_total / Object.keys(game.odds).length).toFixed(2)}`)


for (const odd in game.odds) {
  if (odd !== 'x') {
    let actual_name = game[odd]
    console.log(`Odd of victory ${actual_name}: ${game.odds[odd]}`)
  }
  else {
    console.log(`Odd of draw: ${game.odds[odd]}`)
  }
}

let scorers = {

}

for (const scorer of game.scored) {
  let keys = Object.keys(scorers)
  if (keys.includes(scorer)) {
    scorers[scorer] += 1
  }
  else {
    scorers[scorer] = 1
  }
}

console.log(scorers)

// CHALLENGE 3

// Let's continue with our football betting app! This time, we have a map called 'gameEvents' (see below) with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
// Your tasks:
// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17: ⚽   GOAL

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card']
]);

let events = [...new Set(gameEvents.values())]
console.log(events)

gameEvents.delete(64)
console.log(gameEvents)

console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes.`)

for (let [key, value] of gameEvents) {
  // console.log([key, value])
  if (key <= 45) {
    console.log(`[FIRST HALF] ${key}: ${value}`)
  }
  else {
    console.log(`[SECOND HALF] ${key}: ${value}`)
  }
}