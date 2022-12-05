// Importing module side note, modules default to strict mode so it's not necessary to specify that inside them.

// import './shoppingCart.js';
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js'; // should add the file extension to the import statement, there are a few exceptions where it is not needed which will be covered later.

console.log('importing module');
// cannot access variables from another module, unless they are exported, since they are scoped to be accessed within their own modules.
// so the following will not work
// console.log(cart); // results in a reference error

// console.log(ShoppingCart.totalPrice);
// ShoppingCart.addToCart('eggs', 24);

// import add, { totalPrice as price, tq } from './shoppingCart.js'; // -> importing the export default function defined in shoppingCart and naming it whatever we wanted in this module. also bad practice to mix default imports and named imports on the same line

import add, { cart } from './shoppingCart.js';

add('pizza', 2);
add('bread', 1);
add('eggs', 24);
console.log(cart);

// imports do not copy objects, they just point to it, as a result the above lines change the value of cart and when logged contains the added foods.

// console.log('start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log(`Something`);

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = await getLastPost();
console.log(lastPost);

// one time use function to create a new scope for variables
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} of ${product} was added to the cart (shipping cost was: $${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} of ${product} was ordered from supplier`);
  };

  // anything returned from here becomes public and available to be used in the module. Returning sort of a public API. Whatever is not returned remains effectively private.
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 1);

console.log(ShoppingCart2);
// This is possible through js closures as a function will still have access to all of the variables that were present when it was initiallized even after it is run and no longer accessable.

// CommonJS modules syntax
// Export
// export.addToCart = function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(
//     `${quantity} of ${product} was added to the cart (shipping cost was: $${shippingCost})`
//   );
// };

// import
// const { addToCart } = require('./shoppingCart.js')
