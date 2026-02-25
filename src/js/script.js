

class BooksList {
  constructor() {

    this.favoriteBooks = [];
    this.filters = [];

    this.booksList = null;
    this.filtersForm = null;

    this.getElements();
    this.renderBooks();
    this.initActions();
  }

  getElements() {
    this.booksList = document.querySelector('.books-list');
    this.filtersForm = document.querySelector('.filters');
  }

  renderBooks() {
    const templateSource = document.querySelector('#template-book').innerHTML;
    const template = Handlebars.compile(templateSource);

    for (let book of dataSource.books) {
      const generatedHTML = template(book);

      const bookDOM = this.createDOMFromHTML(generatedHTML);

      const ratingFill = bookDOM.querySelector('.book__rating__fill');
      ratingFill.style.width = book.rating * 10 + '%';
      ratingFill.style.background = this.determineRatingBgc(book.rating);

      this.booksList.appendChild(bookDOM);
    }
  }

  createDOMFromHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.firstChild;
  }

  determineRatingBgc(rating) {
    if (rating < 6) return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    if (rating > 6 && rating <= 8) return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    if (rating > 8 && rating <= 9) return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
  }

  initActions() {

    this.booksList.addEventListener('dblclick', (event) => {
      const bookImageLink = event.target.closest('.book__image');
      if (!bookImageLink) return;

      const bookId = bookImageLink.dataset.id;
      const index = this.favoriteBooks.indexOf(bookId);

      if (index === -1) {
        this.favoriteBooks.push(bookId);
        bookImageLink.classList.add('favorite');
      } else {
        this.favoriteBooks.splice(index, 1);
        bookImageLink.classList.remove('favorite');
      }

      console.log('Favorite books:', this.favoriteBooks);
    });

    this.filtersForm.addEventListener('click', (event) => {
      const clickedElement = event.target;

      if (
        clickedElement.tagName === 'INPUT' &&
        clickedElement.type === 'checkbox' &&
        clickedElement.name === 'filter'
      ) {

        if (clickedElement.checked) {
          this.filters.push(clickedElement.value);
        } else {
          const index = this.filters.indexOf(clickedElement.value);
          this.filters.splice(index, 1);
        }

        this.filterBooks();
      }
    });
  }

  filterBooks() {
    for (const book of dataSource.books) {
      const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
      let shouldBeHidden = false;

      for (const filter of this.filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }
}

new BooksList();
