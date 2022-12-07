// // Importing module side note, modules default to strict mode so it's not necessary to specify that inside them.

// // import './shoppingCart.js';
// // import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// // addToCart('bread', 5);
// // console.log(price, tq);

// // import * as ShoppingCart from './shoppingCart.js'; // should add the file extension to the import statement, there are a few exceptions where it is not needed which will be covered later.
// // for general polyfilling
// import 'core-js/stable/';
// // import 'core-js/stable/array/find';
// // import 'core-js/stable/promise';
// console.log('importing module');
// // For polyfilling async functions
// import 'regenerator-runtime/runtime';
// // cannot access variables from another module, unless they are exported, since they are scoped to be accessed within their own modules.
// // so the following will not work
// // console.log(cart); // results in a reference error

// // console.log(ShoppingCart.totalPrice);
// // ShoppingCart.addToCart('eggs', 24);

// // import add, { totalPrice as price, tq } from './shoppingCart.js'; // -> importing the export default function defined in shoppingCart and naming it whatever we wanted in this module. also bad practice to mix default imports and named imports on the same line

// import add, { cart } from './shoppingCart.js';

// add('pizza', 2);
// add('bread', 1);
// add('eggs', 24);
// console.log(cart);

// // imports do not copy objects, they just point to it, as a result the above lines change the value of cart and when logged contains the added foods.

// // console.log('start fetching');
// // const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// // const data = await res.json();
// // console.log(data);
// // console.log(`Something`);

// // const getLastPost = async function () {
// //   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// //   const data = await res.json();
// //   console.log(data);

// //   return { title: data.at(-1).title, text: data.at(-1).body };
// // };

// // const lastPost = await getLastPost();
// // console.log(lastPost);

// // one time use function to create a new scope for variables
// // const ShoppingCart2 = (function () {
// //   const cart = [];
// //   const shippingCost = 10;
// //   const totalPrice = 237;
// //   const totalQuantity = 23;

// //   const addToCart = function (product, quantity) {
// //     cart.push({ product, quantity });
// //     console.log(
// //       `${quantity} of ${product} was added to the cart (shipping cost was: $${shippingCost})`
// //     );
// //   };

// //   const orderStock = function (product, quantity) {
// //     console.log(`${quantity} of ${product} was ordered from supplier`);
// //   };

// //   // anything returned from here becomes public and available to be used in the module. Returning sort of a public API. Whatever is not returned remains effectively private.
// //   return {
// //     addToCart,
// //     cart,
// //     totalPrice,
// //     totalQuantity,
// //   };
// // })();

// // ShoppingCart2.addToCart('apple', 4);
// // ShoppingCart2.addToCart('pizza', 1);

// // console.log(ShoppingCart2);
// // This is possible through js closures as a function will still have access to all of the variables that were present when it was initiallized even after it is run and no longer accessable.

// // CommonJS modules syntax
// // Export
// // export.addToCart = function (product, quantity) {
// //   cart.push({ product, quantity });
// //   console.log(
// //     `${quantity} of ${product} was added to the cart (shipping cost was: $${shippingCost})`
// //   );
// // };

// // import
// // const { addToCart } = require('./shoppingCart.js')

// // import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';

// import cloneDeep from 'lodash-es';
// // import cloneDeep from 'lodash'; // allegedly parcel installs missing packages, but it doesn't seem to be working for me so 🤷‍♂️

// // const state = {
// //   cart: [
// //     { product: 'bread', quantity: 5 },
// //     { product: 'pizza', quantity: 2 },
// //   ],
// //   user: { loggedIn: true },
// // };

// // const stateClone = Object.assign({}, state);
// // const stateDeepClone = cloneDeep(state);
// // state.user.loggedIn = false; // this changes the logged in value of stateClone as well, not a separate object/deepcopy
// // console.log(stateClone);
// // console.log('deepClone:');
// // console.log(stateDeepClone); // stays logged in since it's a deep copy used from lodash.

// // Parcel specific code, allows changes to occur in browser without the page reloading allowing for the state to remain the same while making changes
// class Person {
//   #greeting = 'Hey';
//   constructor(name) {
//     this.name = name;
//     console.log(`${this.#greeting} ${this.name}!`);
//   }
// }

// const florin = new Person('Florin');
// console.log(florin);

// if (module.hot) {
//   module.hot.accept();
// }

// console.log('Jonas' ?? null);

// console.log(cart.find(el => el.quantity >= 2));

// Promise.resolve('TEST').then(x => console.log(x));
// // Babel can only transpile code that has an equivalent es5 syntax, if something was introduced in es6 and has no equivalent, it cannot change it. ie .find and Promises.
// // Instead they can be polyfilled.
