'use strict';

/////////////////////////////////////////////////
//
//         ELEMENT SELECTORS
//
////////////////////////////////////////////////

// Learn more button
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// selecting the tabs
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// nav
const nav = document.querySelector('.nav');

// carousel related
const dotContainer = document.querySelector('.dots');

///////////////////////////////////////
// Modal functionality

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Making the learn more button scroll down, since it is a button instead of a link for some reason

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  //   // Scrolling
  //   // window.scrollTo(
  //   //   s1coords.left + window.pageXOffset,
  //   //   s1coords.top + window.pageYOffset
  //   // );

  //   // window.scrollTo({
  //   //   left: s1coords.left + window.pageXOffset,
  //   //   top: s1coords.top + window.pageYOffset,
  //   //   behavior: 'smooth',
  //   // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Using event propagation to avoid having to add the same event listener to all items in the navbar, instead choosing to apply one event listener to the navbar itself and letting it propagate
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

////////////////////////////////////////////////
//
//  Implementing the operations tabbed element
//
////////////////////////////////////////////////

// Bad practice since you could theoretically be doing this for hundreds of elements
// tabs.forEach(t => t.addEventListener('click', () => console.log('tab')));

tabsContainer.addEventListener('click', function (e) {
  // can't simply select e.target since clicking on the number in the button would target a span element that contains the number. Now this can be fixed by selecting the span elements and setting pointer events to none to make the span unclickable, thus making the button the target element everytime, but instead the course will use a more convoluted solution to practice DOM traversal. :)
  const clicked = e.target.closest('.operations__tab');
  // I suppose using the closest method on the target would allow fewer mistakes to arise than adding a specific class name to 3 spans or using css selector that takes every span that is a child of a button
  // console.log(clicked);

  // If you click on the space between the buttons, clicked is null and the eventListener exits instead of potentially creating an error
  // Called a guard clause
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate the corresponding content to appear
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////////////////////////////////////////////////
//
//         Making the nav links fade when one is hovered
//      (I think it looks bad on the final version but good practice for events I guess)
////////////////////////////////////////////////

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const clicked = e.target;
    const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
    const logo = clicked.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== clicked) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

// bind allows us to kind of pass in an 'argument' into the handler by setting the this keyword to the value we want to use. If you need multiple 'arguments' passed into the handler can pass in an array.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// event listeners need a function passed in not a function to be called so this works but we can make it better
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// Repetitve, moved to external function to maintain DRY principles
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const clicked = e.target;
//     const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
//     const logo = clicked.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== clicked) el.style.opacity = 0.5;
//     });

//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     const clicked = e.target;
//     const siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
//     const logo = clicked.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if (el !== clicked) el.style.opacity = 1;
//     });

//     logo.style.opacity = 1;
//   }
// });

/////////////////////////////////////////////////
//
//         Making the Navbar sticky once you scroll down
//
////////////////////////////////////////////////

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// const section1Coords = section1.getBoundingClientRect();

// Using a scroll eventlistener is fairly inefficient since it is constantly firing, can make it better
// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   if (window.scrollY > section1Coords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Playing around with intersection observer API

// const observerCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null, //intersects the entirevieport when set to null
//   threshold: 0.1, //Intersection at 10%
// };

// const observer = new IntersectionObserver(observerCallBack, observerOptions);
// observer.observe(section1);

/////////////////////////////////////////////////
//
//         DOM Traversing example
//
////////////////////////////////////////////////
// const h1 = document.querySelector('h1');

// /////////// Traversing down: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// /////////// Traversing up: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // closest acts like the opposite querySelector that picks the closest parent, unlike querySelector which selects children
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// /////////// Traversing Sideways

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// // this is how to select all siblings, includes itself
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// Example of how to removeEventListeners when they happen to allow one time use events
// const h1 = document.querySelector('h1');

// function alertH1(e) {
//   alert('it works maybe hopium');

//   h1.removeEventListener('mouseenter', alertH1);
// }

// h1.addEventListener('mouseenter', alertH1);

// Lecture vid, adding banner for cookie disclaimer
// Selecting, Creating, and Deleting Elements

// Selecting elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// // Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookied for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));

// // header.before(message);
// // header.after(message);

// // Delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
// // message.style.padding = '15px 0';

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautiful minimalist logo';

// // Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);

// // classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // this overwrites the classlist, element will only have the one class when this runs
// // logo.className = 'bruh';

/////////////////////////////////////////////////
//
//         Revealing sections as you scroll to them, because we hid them for some reason, still loaded as of now, but hidden
//
////////////////////////////////////////////////
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  // needed since the first section was being revealed before scrolling into view without intersecting.
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
  // there is a bug where if you navigate to the bottom using navbar sometimes the 3rd section doesn't get revealed and needs to be scrolled past multiple times before it procs, not sure why. Of course after typing this and trying to reproduce it, the bug hasn't happened again.
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // DONE ----- TODO: REMOVE COMMENT BELOW ONCE DONE WITH CAROUSEL
  section.classList.add('section--hidden');
});

/////////////////////////////////////////////////
//
//         Lazy loading images on scrolling past
//
////////////////////////////////////////////////

const allImages = document.querySelectorAll('.lazy-img');
// He uses the selector below in the vid, I think it's just simpler to use the one above, both return the same things even though the === returns false.
// const allImages2 = document.querySelectorAll('img[data-src]');
// console.log(allImages, allImages2);

const revealImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // this should use an eventListener, to not remove the blur before the higher res image is loaded
  // entry.target.classList.remove('lazy-img');
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(revealImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

allImages.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////////////
//
//       Carousel type component
//    It's a bit of a mess below, should refactor this and organize it
////////////////////////////////////////////////

const slides = document.querySelectorAll('.slide');

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;

const maxSlide = slides.length;

const slider = document.querySelector('.slider');
slider.style.overflow = 'hidden';

// Moved to goToSlide function due to DRY principles
// slides.forEach((s, i) => {
//   s.style.transform = `translateX(${100 * i}%)`;
// });

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${
      (100 * (i - slide)) % (maxSlide * 100)
    }%)`;
  });
};

goToSlide(0);

// Next Slide

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};
btnRight.addEventListener('click', nextSlide);

// Previous Slide
const previousSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};
btnLeft.addEventListener('click', previousSlide);

// Adding features to the carousel

// Allowing keyboard navigation for the carousel with key left and right
document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') previousSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

// Navigations dots below carousel

console.log(dotContainer);

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

// creates the dots
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"`)
    .classList.add('dots__dot--active');
};

// initializes an active dot
activateDot(0);

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

////////////////////////////////////////
// DOM Lifecycle
////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('page fully loaded', e);
});

// Weird functionality, works on cmd + r but not actually hitting the reload button on chrome, does not work at all on closing the tab, works fine on firefox from some quick testing. Do not overuse, better that some users unfortunately lose a small amount of content vs annoying all users every time they try to leave.
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
