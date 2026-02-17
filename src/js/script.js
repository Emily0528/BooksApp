
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

  dataSource.books.forEach(book => {
    const generatedHTML = template(book);
    booksList.insertAdjacentHTML('beforeend', generatedHTML);
  });

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
