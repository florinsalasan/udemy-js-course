import View from './view';
import previewView from './previewView';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage =
    'No bookmarks yet. Find a recipe you like to add to the list!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // return this._data.map(this._generateMarkupPreview).join('');
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  // instead of have the same preview markup in both this and results view we instead created another view specifically for previews and we use that in here and in results view
  // _generateMarkupPreview(result) {
  //   const id = window.location.hash.slice(1);

  //   return `
  //   <li class="preview">
  //     <a class="preview__link ${
  //       result.id === id ? 'preview__link--active' : ''
  //     }" href="#${result.id}">
  //       <figure class="preview__fig">
  //         <img src=${result.image} alt="${result.title}" />
  //       </figure>
  //       <div class="preview__data">
  //         <h4 class="preview__title">${result.title}</h4>
  //         <p class="preview__publisher">${result.publisher}</p>
  //       </div>
  //     </a>
  //   </li>
  // `;
  // }
}

export default new BookmarksView();
