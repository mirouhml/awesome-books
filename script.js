class Book {
  constructor() {
    if (localStorage.getItem('books')) {
      this.list = JSON.parse(localStorage.getItem('books'));
    } else { this.list = []; }
  }

  populateStorage() {
    localStorage.setItem('books', JSON.stringify(this.list));
  }

  add(bookTitle, bookAuthor) {
    const book = {
      title: bookTitle,
      author: bookAuthor,
    };
    if (!this.search(bookTitle, bookAuthor)) {
      this.list.push(book);
      this.populateStorage();
    } else {
      const message = document.getElementById('error-message');
      message.textContent = 'The book has already been added.';
    }
  }

  remove(index) {
    this.list.splice(index, 1);
    this.populateStorage();
  }

  search(title, author) {
    const book = this.list.filter((book) => book.title === title && book.author === author);
    if (book.length > 0) return true;
    return false;
  }

  refresh() {
    if (localStorage.getItem('books')) {
      this.list = JSON.parse(localStorage.getItem('books'));
    }
  }

  getList() {
    return this.list;
  }
}

const books = new Book();

function displayBooks() {
  const booksContainer = document.getElementById('books-list');
  books.refresh();
  const booksList = books.getList();
  booksContainer.innerHTML = '';
  for (let i = 0; i < booksList.length; i += 1) {
    const book = document.createElement('li');
    book.innerHTML = `<h2>${booksList[i].title}</h2>
                        <h3>${booksList[i].author}</h3>
                        <button id="book${i}" type="button">Remove</button>
                        <hr>`;
    booksContainer.appendChild(book);
    document.getElementById(`book${i}`).addEventListener('click', () => {
      books.remove(i);
      displayBooks();
    });
  }
}

displayBooks();

const button = document.getElementById('add');

button.addEventListener('click', () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');

  if (title.value === '' || author.value === '') {
    const message = document.getElementById('error-message');
    message.textContent = 'Please fill both the title and the author before adding.';
  } else {
    books.add(title.value, author.value);
    displayBooks();
  }
});
