// Exporting module

// console.log('exporting module');

// Blocking code

// console.log('start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('finish fetching users');

// End of blocking code with top level await. Also blocks the importing module

// Everything in this module occurs BEFORE anything in the module that is importing. ie All code inside a module that is imported needs to wait until all of the code in other modules finishes running.

// const shippingCost = 10;
// export const cart = [];

// export const addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} of ${product} was added to cart`);
// };

// const totalPrice = 237;
// const totalQuantity = 23;

// export { totalPrice, totalQuantity as tq };

// export default function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} of ${product} was added to cart`);
// }
