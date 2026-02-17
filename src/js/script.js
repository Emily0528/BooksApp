
const favoriteBooks = [];
const filters = [];

function initActions() {
     
  const booksList = document.querySelector('.books-list');

  booksList.addEventListener('dblclick', function(event) {
    
    const bookImageLink = event.target.closest('.book__image');

    if (!bookImageLink) return;

    const bookId = bookImageLink.dataset.id;
    const index = favoriteBooks.indexOf(bookId);

    if (index === -1) {
      favoriteBooks.push(bookId);
      bookImageLink.classList.add('favorite');
    } else {
      favoriteBooks.splice(index, 1);
      bookImageLink.classList.remove('favorite');
    }

    console.log('Favorite books:', favoriteBooks);
  });

  const filtersForm = document.querySelector('.filters');

  filtersForm.addEventListener('click', function(event) {

    const clickedElement = event.target;

    if (
      clickedElement.tagName === 'INPUT' &&
      clickedElement.type === 'checkbox' &&
      clickedElement.name === 'filter'
    ) {
      if (clickedElement.checked) {
        filters.push(clickedElement.value);
      } else {
        const index = filters.indexOf(clickedElement.value);
        filters.splice(index, 1);
      }

      console.log(filters);
      filterBooks();

    }

  });
}


function renderBooks() {
  const booksList = document.querySelector('.books-list');
  const templateSource = document.querySelector('#template-book').innerHTML;
  const template = Handlebars.compile(templateSource);

  for (let book of dataSource.books) {

    const generatedHTML = template(book);

    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    const ratingFill = generatedDOM.querySelector('.book__rating__fill');

    ratingFill.style.width = book.rating * 10 + '%';

    ratingFill.style.background = determineRatingBgc(book.rating);

    booksList.appendChild(generatedDOM);

  }

  initActions();
}

renderBooks();

function filterBooks() {

  for (const book of dataSource.books) {

    let shouldBeHidden = false;

    for (const filter of filters) {

      if (!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }

    }

    const bookImage = document.querySelector(
      `.book__image[data-id="${book.id}"]`
    );

    if (shouldBeHidden) {
      bookImage.classList.add('hidden');
    } else {
      bookImage.classList.remove('hidden');
    }

  }

}


function determineRatingBgc(rating) {

  if (rating < 6) {
    return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
  }

  else if (rating > 6 && rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
  }

  else if (rating > 8 && rating <= 9) {
    return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
  }

  else {
    return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
  }

}
