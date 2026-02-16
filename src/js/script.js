
function renderBooks() {
  
  const booksList = document.querySelector('.books-list');

  const templateSource = document.querySelector('#template-book').innerHTML;
  const template = Handlebars.compile(templateSource);

  dataSource.books.forEach(book => {
    
    const generatedHTML = template(book);

    booksList.insertAdjacentHTML('beforeend', generatedHTML);
  });
}

renderBooks();
