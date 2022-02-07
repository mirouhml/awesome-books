let books = [
  {
    title: 'book1',
    author: 'author1',
  },
  {
    title: 'book2',
    author: 'author2',
  },
];

function populateStorage(booksList) {
  localStorage.setItem('books', JSON.stringify(booksList));
}

function addBook(bookTitle, bookAuthor) {
  const book = {
    title: bookTitle,
    author: bookAuthor,
  };
  books.push(book);
  populateStorage(books);
}

function removeBook(title) {
  books = books.filter((book) => book.title !== title);
  populateStorage(books);
}

function displayBooks() {
  const booksContainer = document.getElementById('books-list');
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
  }
  booksContainer.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const book = document.createElement('li');
    book.innerHTML = `<h2>${books[i].title}</h2>
                        <h3>${books[i].author}</h3>
                        <button id="book${i}" type="button">Remove</button>
                        <hr>`;
    booksContainer.appendChild(book);
    const { title } = books[i];
    document.getElementById(`book${i}`).addEventListener('click', () => {
      removeBook(title);
      displayBooks();
    });
  }
}

displayBooks();

const button = document.getElementById('add');

button.addEventListener('click', () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  addBook(title.value, author.value);
  displayBooks();
});
