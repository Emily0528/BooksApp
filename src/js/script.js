
const favoriteBooks = [];

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
