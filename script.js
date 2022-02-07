let books = [
    {
        title: 'book1',
        author: 'author1'
    },
    {
        title: 'book2',
        author: 'author2'
    },
]

function addBook(title,author) {
    const book = {
        title: title,
        author: author
    }
    books.push(book);
}

function removeBook(title) {
    books = books.filter(book => book.title !== title)
}

function displayBooks() {
    const booksContainer = document.getElementById('books-list');
    for(let i=0; i<books.length; i+=1) {
        const book = document.createElement('li');
        book.innerHTML = `<h2>${books[i].title}</h2>
                        <h3>${books[i].author}</h3>
                        <button type="button">Remove</button>
                        <hr>`;
        booksContainer.appendChild(book);
    }
}

displayBooks();

const button = document.getElementById('add');

button.addEventListener('click', () => {
    addBook('title3', 'author3');
    displayBooks();
});
