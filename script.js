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
    this.list.push(book);
    this.populateStorage();
  }

  remove(index) {
    this.list.splice(index, 1);
    this.populateStorage();
  }

  search(title, author) {
    const book = this.list.filter((book) => book.title.toLowerCase() === title.toLowerCase()
                                  && book.author.toLowerCase() === author.toLowerCase());
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
    book.innerHTML = `<h3 class="book">"${booksList[i].title}" by ${booksList[i].author}</h3>
                      <button id="book${i}" type="button">Remove</button>`;
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
  const message = document.getElementById('error-message');
  message.textContent = '';
  if (title.value === '' || author.value === '') {
    message.textContent = 'Please fill both the title and the author before adding.';
  } else if (!books.search(title.value, author.value)) {
    books.add(title.value, author.value);
    displayBooks();
    title.value = '';
    author.value = '';
    message.textContent = 'The book has been added successfully.';
    message.style.color = 'green';
  } else {
    const message = document.getElementById('error-message');
    message.textContent = 'The book has already been added.';
  }
  setInterval(() => { message.textContent = ' '; }, 5000);
});

const booksSection = document.getElementById('books');
const addSection = document.getElementById('add-book');
const contactSection = document.getElementById('contact');
document.getElementById('menu-list').addEventListener('click', () => {
  booksSection.style.display = 'flex';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
});
document.getElementById('menu-add-book').addEventListener('click', () => {
  booksSection.style.display = 'none';
  addSection.style.display = 'flex';
  contactSection.style.display = 'none';
});
document.getElementById('menu-contact').addEventListener('click', () => {
  booksSection.style.display = 'none';
  addSection.style.display = 'none';
  contactSection.style.display = 'flex';
});

const dateContainer = document.getElementById('date-time');
function myTimer() {
  const today = new Date();
  dateContainer.textContent = `${today.toDateString()}, ${today.toLocaleTimeString()}`;
}
myTimer();
setInterval(() => { myTimer(); }, 1000);
