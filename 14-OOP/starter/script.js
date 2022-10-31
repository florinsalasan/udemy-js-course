'use strict';

// cannot use an arrow function for a constructor function since it does not have a 'this' keyword attached
const Person = function (firstName, birthYear) {
  console.log(this);
  // logged: Person {}
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Do not make functions inside of a constructor, bad performance since each instance of an object made with the constructor will contain the method.
  // this.calcAge = function() {
  //   console.log(2037 - this.birthYear)
  // }
};

const flo = new Person('Florin', 1999);
console.log(flo);
// logs the type of Object and the firstname and birthyear values

// 1. New object is created, {}
// 2. constructor function is called, this = {} the object above in 1.
// 3. {} linked to the prototype
// 4. function automatically returns {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1989);

console.log(matilda, jack);

// Constructor functions kind of act as a class in js since classes do not exist, thus you can colloquially call the new people made with a constructor instances of the constructor

///////////////////////////////////
//
//          Prototypes
//
///////////////////////////////////
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2077 - this.birthYear);
};

// the calcAge is not a method directly in 'flo' but inherits the method through prototypal inheritance and there is only one method created in the prototype.
flo.calcAge();

console.log(flo.__proto__);
console.log(flo.__proto__ === Person.prototype); // Logs true

console.log(Person.prototype.isPrototypeOf(flo)); // also true
console.log(Person.prototype.isPrototypeOf(Person)); // logs false

// Can set
Person.prototype.species = 'Homo Sapiens';
console.log(flo);
console.log(flo.species);
console.log(flo.hasOwnProperty('firstName')); //true
console.log(flo.hasOwnProperty('species')); //false since it's not directly on the flo object, instead it is inherited.

// prototype chain goes null <- Object.prototype <- Person.prototype <- A Person object
console.log(flo.__proto__); // Person.prototype
console.log(flo.__proto__.__proto__); // Object.prototype, shows all of the methods that are available to all Objects
console.log(flo.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);
const arr = [3, 8, 4, 10, 10, 3, 4]; // new Array === []
console.log(arr.__proto__ === Array.prototype); // true

// can add new method to Arrays, typically not a good idea to extend the prototype to built-in types/objects
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
// everything is a huge prototype chain
console.dir(h1);
console.dir(x => x + 1);
