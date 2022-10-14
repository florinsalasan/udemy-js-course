// CHALLENGE 1

// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's(corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy   ")
// 4. Run the function for both test datasets
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far 😉

console.log('CHALLENGE 1');

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCopy = [...dogsJulia].slice(1, -2);

  const allDogs = [...dogsJuliaCopy, ...dogsKate];

  allDogs.forEach(function (dog, i) {
    let remainingSentence =
      dog < 3 ? `still a puppy` : `is an adult, and is ${dog} years old`;

    console.log(`Dog number ${i + 1} is ${remainingSentence}`);
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// CHALLENGE 2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// Test data:
// § Data1:[5,2,4,1,15,8,3] § Data2:[16,6,10,5,6,1,4]

console.log('CHALLENGE 2');

const calcAverageHumanAge = function (ages) {
  let humanAges = [];
  ages.forEach(function (age) {
    let humanAge = age > 2 ? 16 + age * 4 : 2 * age;
    humanAges.push(humanAge);
  });

  let excludedAges = humanAges.filter(age => age >= 18);

  // console.log(excludedAges)

  let averageAge =
    excludedAges.reduce((partialSum, a) => partialSum + a) /
    excludedAges.length;

  console.log(averageAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

// CHALLENGE 3

// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!
// Test data:
// § Data1:[5,2,4,1,15,8,3] § Data2:[16,6,10,5,6,1,4]

console.log('CHALLENGE 3');

const calcAverageHumanAge2 = ages => {
  const humanAges = ages
    .map(age => (age > 2 ? 16 + age * 4 : 2 * age))
    .filter(age => age >= 18)
    .reduce((partSum, a, i, arr) => partSum + a / arr.length, 0);
  console.log(humanAges);
  return humanAges;
};

calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

// CHALLENGE 4

// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog,calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food(try to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

console.log('CHALLENGE 4');

// 1
dogs.forEach(dog => (dog.recommendedFood = dog.weight ** 0.75 * 28));
console.log(dogs);

// 2
sarahsDog = dogs[dogs.findIndex(dog => dog.owners.includes('Sarah'))];
console.log(
  sarahsDog.curFood > sarahsDog.recommendedFood
    ? 'Eating too much'
    : 'Not eating enough'
);

// 3
let ownersEatTooMuch = [];
let ownersEatTooLittle = [];

dogs.forEach(dog =>
  dog.curFood > dog.recommendedFood
    ? (ownersEatTooMuch = ownersEatTooMuch.concat(dog.owners))
    : (ownersEatTooLittle = ownersEatTooLittle.concat(dog.owners))
);

console.log(ownersEatTooLittle);
console.log(ownersEatTooMuch);

// 4
console.log(ownersEatTooLittle.join(' and ').concat("'s dogs eat too little."));
console.log(ownersEatTooMuch.join(' and ').concat("'s dogs eat too much."));

// 5
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6
console.log(
  dogs.some(
    dog =>
      dog.recommendedFood * 0.9 <= dog.curFood &&
      dog.curFood <= dog.recommendedFood * 1.1
  )
);

// 7
const dogsEatingAight = dogs.filter(
  dog =>
    dog.recommendedFood * 0.9 <= dog.curFood &&
    dog.curFood <= dog.recommendedFood * 1.1
);

console.log(dogs);
console.log(dogsEatingAight);

// 8
const dogsAsc = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
// I'm either blind or stupid or both, I ran the above multiple times without noticing that the array was sorted, split it into two separate calls, it worked, chained them again and it continues to work even though I swear it didn't earlier 🤔

console.log(dogsAsc);
console.log(dogs);
