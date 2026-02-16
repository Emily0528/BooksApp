
const favoriteBooks = [];

function initActions() {
  const bookImages = document.querySelectorAll('.book__image');

  for (let i = 0; i < bookImages.length; i++) {
    const image = bookImages[i];
    image.addEventListener('dblclick', function () {
      const bookId = this.dataset.id;

      const index = favoriteBooks.indexOf(bookId);

      if (index === -1) {
        favoriteBooks.push(bookId);
        this.classList.add('favorite');
      } else {
        favoriteBooks.splice(index, 1);
        this.classList.remove('favorite');
      }

      console.log('Favorite books:', favoriteBooks);
    });
  }
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
