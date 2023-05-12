import { createContext, useState, useEffect } from "react";

const BookContext = createContext();

export function BookContextProvider(props) {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const result = await fetch("https://library-server-node.onrender.com/books");
    const data = await result.json();
    const books = data.books;
    console.log("Books fetched");
    setBooks(books);
  };

  const getSingleBook = async (bookId) => {
    const response = await fetch(`https://library-server-node.onrender.com/book/${bookId}`);
    const data = await response.json();
    const book = data.book;
    console.log("Fetched single book");
    return book;
  };

  const addBook = async (book) => {
    await fetch("https://library-server-node.onrender.com/book", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Book added");
  };

  const deleteBook = async (bookId) => {
    await fetch(`https://library-server-node.onrender.com/book/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Book deleted");
  };

  useEffect(() => {
    getBooks();
  }, []);

  console.log("Context rendered");
  console.log(books);

  const context = {
    books: books,
    addBook: addBook,
    setBooks: setBooks,
    getSingleBook: getSingleBook,
    deleteBook: deleteBook,
  };

  return (
    <BookContext.Provider value={context}>
      {props.children}
    </BookContext.Provider>
  );
}

export default BookContext;
