let books = []

function addBook(title,author) {
    const book = {
        title: title,
        author: author
    }
    books.push(book);
}

function removeBook(title,author) {
    books = books.filter(book => book.title !== title)
}
