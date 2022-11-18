'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

// if (navigator.geolocation)
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//       console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//       const coords = [latitude, longitude];

//       map = L.map('map').setView(coords, 13);

//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       // handling clicks on map
//       map.on('click', function (mapE) {
//         mapEvent = mapE;
//         form.classList.remove('hidden');
//         inputDistance.focus();
//       });
//     },
//     function () {
//       alert('Could not get your position');
//       map = L.map('map').setView([43.65, -79.39], 13);

//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);
//     }
//   );

// Making the workout, running, and cycling class available since they do not get hoisted or are at least uninitialized
class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  // clicks = 0;

  constructor(coords, distance, duration) {
    this.distance = distance; // in km
    this.duration = duration; // in minutes
    this.coords = coords; // [LAT, LONG]
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  // click() {
  //   this.clicks++;
  // }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence; // steps per min
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // want it in min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain; // in meters
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // want in km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// let w1 = new Cycling([43.65, -71.86], 15, 25, 5);
// let w2 = new Running([43.1, -71.12], 15, 25, 5);
// Adding classes for the overall App, then workouts, and two classes that extend workout - cycling and running
// APP ARCHITECHTURE
class App {
  // constructor(workouts, map) {
  //   this.workouts = workouts;
  //   this.map = map;
  // }
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoom = 13;

  constructor() {
    // get position
    this._getPosition();

    // get data from local storage
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkout.bind(this)); // need to bind to this becuase it would be pointing to the form otherwise

    inputType.addEventListener('change', this._toggleElevationField.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), // need to bind this to this because in the callback it is called as an actual function and not a method, resulting in a 'this' that is undefined in _loadMap
        function () {
          alert('Could not get your position');

          // Default the map to showing Toronto, could improve by grabbing the locale and using the coordinates of the country's capital but that's an improvement for another time
          this.#map = L.map('map').setView([43.6532, -79.3832], this.#mapZoom);
          L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(this.#map);
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoom);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks again but with classes now
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(workout => {
      this._renderWorkoutMarker(workout);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    const cadenceRow = inputCadence.parentElement;
    const elevationRow = inputElevation.parentElement;
    // console.log(cadenceRow);

    cadenceRow.classList.toggle('form__row--hidden');
    elevationRow.classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));

    const positiveInputs = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from the form
    const type = inputType.value;
    const distance = parseInt(inputDistance.value);
    const duration = parseInt(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // create the object that matches the workout type
    if (type === 'running') {
      const cadence = parseInt(inputCadence.value);
      // Validate data
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !positiveInputs(distance, duration, cadence)
      )
        return alert('Inputs have to be a valid number'); //guard clause;

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    if (type === 'cycling') {
      const elevation = parseInt(inputElevation.value);
      // Validate data
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(elevation)
        !validInputs(distance, duration, elevation) ||
        !positiveInputs(distance, duration)
      )
        return alert('Inputs have to be a valid number'); //guard clause;

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // add object to workout array
    this.#workouts.push(workout);
    // console.log(workout);

    // display marker
    this._renderWorkoutMarker(workout);

    // render workout to the list
    this._renderWorkout(workout);

    // clear the input fields
    inputDistance.value =
      inputCadence.value =
      inputElevation.value =
      inputDuration.value =
        '';

    // hide the form by setting display to none to remove the animation and make it seem like the form is replaced by the workout entry

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);

    // add to local storage
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    const workoutType = workout.type;
    const workoutEmoji = workout.type === 'running' ? '🏃' : '🚴‍♀️';

    const html = `
        <li class="workout workout--${workoutType}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workoutEmoji}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${
              workoutType === 'running'
                ? workout.pace.toFixed(1)
                : workout.speed.toFixed(1)
            }</span>
            <span class="workout__unit">${
              workoutType === 'running' ? 'min/km' : 'km/h'
            }</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">${
              workoutType === 'running' ? '🦶🏼' : '⛰'
            }</span>
            <span class="workout__value">${
              workoutType === 'running'
                ? workout.cadence
                : workout.elevationGain
            }</span>
            <span class="workout__unit">${
              workoutType === 'running' ? 'spm' : 'm'
            }</span>
          </div>
        </li>
          `;

    // find the workout list and append the above html to it as a new list item
    // console.log(document.querySelector('.workouts'));
    // document.querySelector('.workouts').innerHTML += html; //using this method of adding the workout to the list would prevent the form from being hidden afterwards,

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoom, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // workout.click();
    // console.log(workout);
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    // NOTE that parsing from localstorage removes the prototype chaining and the recovered objects are simplified and no longer inherit all of the methods and from parent classes, as a result the click method no longer works on objects that were stored but will work on newly created objects. Could theoretically create new objects from the data retrieved from localstorage when the page loads instead but that would take some refactoring that I'm not in the mood for right now. Also considering expanding this project into having a dedicated db and login to allow a user to access data across computers, potentially on mobile too but that's a while away. Should also allow a way of removing entries in the ui

    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(workout => {
      this._renderWorkout(workout);
      // at this point the map has not been created so cannot do marker rendering yet, instead call it in _loadMap
      // this._renderWorkoutMarker(workout);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

// Instead of calling some methods outside of the class in order to have them available as the page loads, can call them in the constructor instead which is called when the class is loaded ie when app is created as a new App;
const app = new App();
// app._getPosition();
