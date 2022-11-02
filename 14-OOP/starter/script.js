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

// ES6 classes
// classes count as a special function, this is just a nice syntax nothing really changes under the hood, still deals with the prototype and chains.

//// class expression
// const PersonCl = class {};

//// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // methods get added to the prototype property
  // instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // when setting a property that already exists avoid using the same variable name
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    // to avoid a conflict with the constructor property
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method by adding the static keyword
  static hey() {
    console.log(`Hey there 👋`);
    console.log(this);
  }
}

const hope = new PersonCl('Hope Davis', 1996);
console.log(hope);
hope.calcAge();
console.log(hope.__proto__ === PersonCl.prototype); // true

// Can still add methods to the class prototype if you want
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};
hope.greet();
console.log(hope.age);

// Some notes: make sure to understand the under the hood material before using classes to avoid unexpected issues
// 1. Classes are not hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode even if not enabled on the file

// Setters and getters
const account = {
  owner: 'Flo',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // 300
account.latest = 50;
console.log(account.movements); // [200, 530, 120, 300, 50]
console.log(account.latest); // 50

// now to add them to the PersonCl class // They're in there now
// messing around with static methods
// ie Number.parseFloat() is a static method that is in the Number namespace, it can be called from the as shown above, but it cannot be called directly on a number. It is attached to the constructor but not available on a number directly

// Creating a static method

Person.hey = function (person) {
  console.log(`Hey there ${person.firstName} 👋`);
  console.log(this); // this === the person constructor
};

// Person.hey(); // would work if there was no arguments to pass in.
// flo.hey(); // this does not work, says it is not a function
Person.hey(flo); // this works

PersonCl.hey(); // works
// hope.hey(); // once again, not a function

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;

steven.calcAge();

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// Object.create is important in being able to make true class inheritance
