'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const renderCountryCard = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          data.population / 1000000
        ).toFixed(1)} million people</p>
        <p class="country__row"><span>🗣️</span>${
          data.languages[Object.keys(data.languages)[0]]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.keys(data.currencies)[0]
        }</p>
      </div>
    </article>
    `;

  //   console.log(data);

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// ///////////////////////////////////////
// // AJAX: Async js and xml. Allows communication with remote web servers in an async way, allowing data requests to happen dynamically. typically no modern apis use xml anymore, most of the web works through json now.

// // the base url of the api should be https://restcountries.com/v3.1/ for this section

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     // render data country
//     renderCountryCard(data);

//     // get 1st bordering country and render it
//     const [neighbour] = data.borders;

//     console.log(neighbour);
//     if (!neighbour) return;

//     // second request for the first neighbour
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       console.log(data);
//       renderCountryCard(data, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('canada');
// getCountryAndNeighbour('USA ');

////////////////////////////////////////

// USING PROMISES TO MODERNIZE

////////////////////////////////////////

const request = fetch('https://restcountries.com/v3.1/name/canada');

const getJSON = function (url, errMsg = 'Something went wrong 😔') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} (${response.status})`);

    return response.json();
  });
};

// DRYING the repetitve then calls into the helper function getJSON

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(
//       response => {
//         console.log(response);

//         if (!response.ok)
//           throw new Error(`Country not found (${response.status})`);

//         return response.json();
//       }
//       // err => console.log(err)
//     )
//     .then(data => {
//       renderCountryCard(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;

//       //neighbour
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     }) // you return the fetch promise in order to avoid the callback hell that would occur with nested AJAX calls, instead opting for a cleaner and easier to maintain flat chain
//     .then(response => response.json())
//     .then(data => {
//       renderCountryCard(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.log(err);
//       renderError(`Something went wrong 🤯 ${err.message}. Try again!`);
//     }) // instead of adding a second callback to each fetch to catch errors, can instead add a catch method at the end of the chain that will handle all of them.
//     .finally(() => {
//       countriesContainer.style.opacity = 1; // finally method is used when a piece of code needs to be executed regardless of the result of the promise. Works at the end of the chain because catch also returns a promise to chain off of.
//     });
// };

// getCountryData('canada');

// btn.addEventListener('click', function () {
//   getCountryData('brazil');
// });

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      // new api version simply does not have borders property if the country has no neighbours, resulting in unintended behaviour

      renderCountryCard(data[0]);

      if (!data[0]?.borders) throw new Error('No neighbour found');

      const neighbour = data[0].borders[0];

      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountryCard(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err}`);
      renderError(`Something went wrong 🤯 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// Call stack, callback queue, and microtasks queue interactions and priorities

// js uses an event loop where it cycles through the callstack, then microtasks, then callback queue. Thus synchronous lines are executed first, then microtasks, then callbacks which then shows that things such as setTimeout do not guarantee the callback executing at precisely the defined time, but rather that it won't execute before then.

// quick example of priorities

// console.log('test start'); // 1st
// setTimeout(() => console.log(`0 sec timer`), 0); // 5th
// Promise.resolve('resolved promise 1').then(res => console.log(res)); // 3rd
// Promise.resolve('resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {} //4th
//   console.log(res);
// });
// console.log('test end'); // 2nd

// const lotteryPromise = new Promise(function (resolve, reject) {
//   // pass in an executor function which itself takes in resolve and rejection functions

//   console.log('Lotto draw in progress');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WON 🥳');
//     } else {
//       reject(new Error('You lost 😔'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// // Promisifying setTimeout. Pro
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log(`I waited for 2 seconds`);
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

////////////////////////////////
// promisifying geolocation
////////////////////////////////

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject); // this is equivalent to the code that has been commented out above
  });
};

// getPosition().then(pos => console.log(pos));
// using getPosition to call whereAmI from the first coding challenge

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       console.log(pos.coords);
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (response.status === 403)
//         throw new Error('Too many requests done too quickly');

//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(data => {
//       if (data.status === 404) throw new Error('Could not find your country');

//       if (data.status !== 200)
//         throw new Error('Could not retrieve country data');

//       return data.json();
//     })
//     .then(data2 => {
//       let [data] = data2;
//       console.log(data);
//       const html = `
//         <article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               data.population / 1000000
//             ).toFixed(1)} million people</p>
//             <p class="country__row"><span>🗣️</span>${
//               data.languages[Object.keys(data.languages)[0]]
//             }</p>
//             <p class="country__row"><span>💰</span>${
//               Object.keys(data.currencies)[0]
//             }</p>
//           </div>
//         </article>
//         `;

//       //   console.log(data);

//       countriesContainer.insertAdjacentHTML('beforeend', html);
//     })
//     .catch(err => {
//       console.error(`Something went wrong: ${err.message}`);
//       const errMsg = `Something went wrong: ${err.message}`;
//       countriesContainer.insertAdjacentText('beforeend', errMsg);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// // btn.addEventListener('click', whereAmI);

const whereAmI = async function () {
  try {
    // getting geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // using reverse geocoding to get the country/city
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error(`Problem getting location data`);
    const dataGeo = await resGeo.json();

    // getting country information based on the reverse geocoding
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error(`Problem getting country`);
    console.log(res);

    const data = await res.json();

    renderCountryCard(data[0]);
    // equivalent to the old .then chaining, just nicer syntactically
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💍`);
    renderError(`😳 ${err.message}`);

    // Reject promise returned from asunc function
    throw err;
  }
};

// console.log('1: Will get location');
// // const city = whereAmI();
// // console.log(city); --> returns a promise since the function is async and js will just move on to the next line to prevent blocking.

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 🪖`))
//   .finally(() => console.log('3: Got location'));

// console.log('before inner log');

// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }

// const statusUpdates = async function () {
//   try {
//     console.log('1: Getting location');

//     const city = await whereAmI();
//     console.log(`2: ${city}`);

//     console.log(`3: Got location 🫡`);
//   } catch (err) {
//     console.error(`😬 ${err.message}`);
//   }
// };

// statusUpdates();

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // this way runs all three awaits one after the other even though they are independent of each other

//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

//     // instead, running it this way will let them load independently of each other and at the same time, which should dramatically reduce loading times. However if one promise rejects, Promise.all is also rejected and shortcircuits, mdn documents say it is possible to change the behaviour by handling the rejections.
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);

//     console.log(data.map(d => d[0].capital[0]));
//     // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
//   } catch (err) {
//     console.error(`😬 ${err.message}`);
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');

// // Promise.race only returns the first promise, can shortcircuit if a Promise gets rejected and return the rejection.
// // (async function () {
// //   const res = await Promise.race([
// //     getJSON(`https://restcountries.com/v3.1/name/italy`),
// //     getJSON(`https://restcountries.com/v3.1/name/egypt`),
// //     getJSON(`https://restcountries.com/v3.1/name/mexico`),
// //   ]);

// //   console.log(res);
// // })();

// // Can use Promise.race to timeout another Promise in the case of poor internet for something that would not be useful to the user.

// const timeoutPromise = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long!`));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   timeoutPromise(1),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.error(err.message));

// // Promise.allSettled
// // returns array of all results, does not shortcircuit and will return Promises that were rejected along with those that were resolved

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Anotha one Success'),
//   Promise.resolve('Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err.message));

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Anotha one Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// // Promise.any
// // Returns the first Promise that is resolved, like race but won't return a rejected promise, if no passed in promise can be resolved, then Promise.any rejects with an AggregateError

// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Anotha one Success'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
