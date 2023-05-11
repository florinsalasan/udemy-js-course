import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import icons from '../img/icons.svg'; // Parcel 1 method in case you ever need to downgrade
// import icons from 'url:../img/icons.svg'; // Parcel 2 method

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return; //guard clause to return early so it doesn't error out on initial load
    recipeView.renderSpinner();

    // Update results view so that there is a marker for which recipe is currently open
    resultsView.update(model.getResultsPage());

    // rendering bookmark view from localstorage, was trying to update these even on initial load, better solution is to create a separate handler that does that and then call update on bookmarksView moving forward
    bookmarksView.update(model.state.bookmarks);

    // Load recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query from the search box
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results (console.log is temp)
    resultsView.render(model.getResultsPage(1));

    // 4) Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // const goToPage = btn.classList.contains('pagination__btn--prev')
  //   ? model.state.search.page - 1
  //   : model.state.search.page + 1; I liked this solution but
  // data attributes are better to use

  // Render the new results and pagination buttons
  resultsView.render(model.getResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings in state
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);  Don't want to re-render the entire view. just want the updated info the be updated
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add or remove a bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // Update the recipe view
  recipeView.update(model.state.recipe);

  // re-render the bookmarks with the updated list
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
