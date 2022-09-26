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