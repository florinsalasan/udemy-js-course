'use strict';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// budget[0].value = 10000; // can change a value that is another level deeper in a frozen object because it is not a deepfreeze.
// budget[9] = 'Flo'; // cannot completely change a value inside a frozen object
// Can find libraries that can provide a deep freeze if needed.

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// spendingLimits.jay = 200; // cannot add because Object.freeze makes an object immutable.

const getLimit = (limits, user) => limits?.[user] ?? 0;

// addExpense is a pure function, doesn't rely on any variables that were not passed in and does not mutate anything/have any side effects
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  // clarified function name
  // if (!user) user = 'jonas'; // setting a default user, should do this in parameters
  const cleanUser = user.toLowerCase();

  // let lim;
  // if (spendingLimits[user]) {
  //   lim = spendingLimits[user];
  // } else {
  //   lim = 0;
  // } old, was turned into the ternary operator

  // const limit = spendingLimits[user] ? spendingLimits[user] : 0; // can be updated to even newer syntax below

  return value <= getLimit(limits, cleanUser)
    ? // budget.push({ value: -value, description, user: cleanUser });
      [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// can compose these function calls and curry them to remove all of these additional calls.

const checkExpenses2 = function (state, limits) {
  // let lim;
  // if (spendingLimitsentry.user]) {
  //   lim = spendingLimitsentry.user];
  // } else {
  //   lim = 0;
  // }
  // const limit = spendingLimits?.[entry.user] ?? 0;
  // for (const entry of budget)
  //   if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });
};

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );
// checkExpenses and checkExpenses2 have the exact same functionality, they are both pure because they either return a new state rather than modifying the state that was passed in.

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

  console.log(bigExpenses);
  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // // if (entry.value <= -bigLimit) {
  // //   output += `${entry.description.slice(-2)} / `; // Emojis are 2 chars
  // // }
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

logBigExpenses(finalBudget, 500);
