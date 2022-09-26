let js = 'aight I guess'
if (js === "amazing") alert("js is fun");

console.log(40 + 8 - 23 + 18);

let firstName = "Florin"


// JS fundamentals pt 1 practice assignments for values and variables: see related pdf for more info

let country = "Canada"
const continent = "North America"
let population = 38

console.log("I live in " + country + " which is a country in " + continent + " and has a population of " + population.toString() + " million.")

// Datatypes practice
const isIsland = false
let language = "English";
console.log(typeof (country), typeof (continent), typeof (population), typeof (isIsland), typeof (language))

// let var const practice, just a matter of changing already defined variables
// continent = "EU"
// as expected get a typeError for trying to change a const

// Basic operators practice:
let halfPopulation = population / 2
population++
console.log(population)
let morePeopleThanFinland = population > 6
let lessPeopleThanAvg = population < 33
let description = country + " is in " + continent + ", and its " + population.toString() + " million people speak " + language + "."
console.log(description)

// strings and template literals practice:
description = `${country} is in ${continent}, and its ${population} million people speak ${language}.`
console.log(description)

// taking decisions if/else block practice
if (!lessPeopleThanAvg) {
  console.log(`${country}'s population is above average`)
} else {
  console.log(`${country}'s population is below average`)
}

// type conversion and coercion practice:
// predict the result of the following without running them
'9' - '5'; // 4
'19' - '13' + '17'; // 23
'19' - '13' + 17; //23
'123' < 57; // false
5 + 6 + '4' + 9 - 4 - 2; // 18

console.log('9' - '5') // 4
console.log('19' - '13' + '17') // '617' as a string I believe that js string subtraction of ints, possibly of floats, is treated as if subtracting ints and then the addition is concatenating the strings as done in the initial declaration of description.
console.log(typeof ('19' - '13' + '17'))
console.log('19' - '13' + 17, "this is the mixed type addition") // 23 
console.log('123' < 57) // false
console.log(5 + 6 + '4' + 9 - 4 - 2) // 1143 I'm assuming it treats the equations before and after the '4' properly and then concatenates the results together as strings with the 4 in the middle of them