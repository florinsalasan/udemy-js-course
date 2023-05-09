import View from './view';
import icons from 'url:../../img/icons.svg'; //Parcel 2

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.recipesPerPage
    );
    // On Page 1 and results > 10
    if (this._data.page === 1 && numPages > 1) {
      return this._generateMarkupButtonNext();
    }
    // On Page 1 and results <= 10
    else if (this._data.results.length < this._data.recipesPerPage) {
      return ` `;
    }
    // On the last page
    else if (this._data.page === numPages && numPages > 1) {
      return this._generateMarkupButtonPrev();
    }
    // Any other pages in between
    else {
      return (
        this._generateMarkupButtonPrev() + this._generateMarkupButtonNext()
      );
    }
  }

  _generateMarkupButtonNext() {
    return `
    <button data-goto=${
      this._data.page + 1
    } class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  `;
  }

  _generateMarkupButtonPrev() {
    return `
      <button data-goto=${
        this._data.page - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.page - 1}</span>
      </button>
      `;
  }

  addHandlerPageNext(handler) {
    let target = document.getElementsByClassName('.pagination__btn--prev');
    target.addEventListener('click', function (e) {
      e.preventDefault();
      this._data.page += 1;
    });
  }
}

export default new PaginationView();
