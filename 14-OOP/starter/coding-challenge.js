// CHALLENGE 1
// Your tasks:
// 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a 'speed' property. The 'speed' property is the current speed of the car in km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them
// Test data:
// § Data car 1: 'BMW' going at 120 km/h
// § Data car 2: 'Mercedes' going at 95 km/h

console.log('CHALLENGE 1');
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.printSpeed = function () {
  console.log(`The car ${this.make} is now going ${this.speed} kph.`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  this.printSpeed();
};

Car.prototype.brake = function () {
  this.speed = this.speed - 5 > 0 ? this.speed - 5 : 0;
  this.printSpeed();
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
const toyota = new Car('Toyota', 14);

// bmw.accelerate();
// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.brake();
// bmw.brake();
// bmw.brake();
// bmw.brake();
// bmw.brake();
// mercedes.brake();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.brake();
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.brake();
// mercedes.accelerate();
// toyota.brake();
// toyota.accelerate();
// toyota.accelerate();
// toyota.accelerate();
// toyota.accelerate();
// toyota.accelerate();
// toyota.accelerate();
// toyota.brake();
// toyota.brake();
// toyota.brake();

// CHALLENGE 2
// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter.
// Test data:
// § Data car 1: 'Ford' going at 120 km/h

console.log('CHALLENGE 2');

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  printSpeed() {
    console.log(`The car ${this.make} is now going ${this.speed} kph.`);
  }

  accelerate() {
    this.speed += 10;
    this.printSpeed();
  }

  brake() {
    this.speed = this.speed - 5 > 0 ? this.speed - 5 : 0;
    this.printSpeed();
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speedMPH) {
    this.speed = speedMPH * 1.6;
    this.printSpeed();
  }
}

const ford = new CarCl('Ford', 120);

// messing around with the es6 class car
// ford.accelerate();
// ford.brake();
// console.log(ford.speedUS);
// ford.speedUS = 100;
// console.log(ford.speedUS);
// ford.printSpeed();
// ford.speedUS = 10;
// ford.brake();
// ford.brake();
// ford.brake();
// ford.brake();
// ford.brake();

// CHALLENGE 3

// 1. Use a constructor function to implement an ElectricCar (called'EV') as a child "class" of 'Car'. Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
// 2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
// 4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! Hint: Review the definiton of polymorphism 😉
// Test data:
// § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%

const ElectricCar = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constructor = ElectricCar;

ElectricCar.prototype.printSpeed = function () {
  console.log(
    `This ${this.make} is travelling at ${this.speed} kph and has a remaining charge of ${this.charge}%`
  );
};

ElectricCar.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

ElectricCar.prototype.accelerate = function () {
  this.charge -= 1;
  if (this.charge > 0) {
    this.speed += 20;
    this.printSpeed();
  } else {
    console.log(`The ${this.make} has ran out of battery!`);
  }
};

const tesla = new ElectricCar('Tesla', 25, 5);

// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.chargeBattery(15);
// tesla.printSpeed();
// tesla.brake();
