'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
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
  // countriesContainer.style.opacity = 1;
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

btn.addEventListener('click', function () {
  getCountryData('brazil');
});

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
