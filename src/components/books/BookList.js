import { useContext, useEffect, useState } from "react";
import classes from "./BookList.module.css";

import BookItem from "./BookItem.";
// import BookContext from "../../store/book-context";

function BookList() {
  // const booksCtx = useContext(BookContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const fetchedBooks = data.books;
        setBooks(fetchedBooks);
        console.log("Books fetched");
      });
  }, []);

  return (
    <section className={classes.listContainer}>
      <ul className={classes.bookList}>
        {books.map((book, index) => {
          return <BookItem key={index} book={book} />;
        })}
      </ul>
    </section>
  );
}

export default BookList;
