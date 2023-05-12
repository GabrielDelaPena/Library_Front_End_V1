import { useContext, useEffect, useState } from "react";
import classes from "./BookList.module.css";

import BookItem from "./BookItem.";
// import BookContext from "../../store/book-context";

function BookList() {
  // const booksCtx = useContext(BookContext);
  const [books, setBooks] = useState([]);
  const [serverStatus, setServerStatus] = useState();

  useEffect(() => {
    fetch("https://library-server-node.onrender.com/books")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const fetchedBooks = data.books;
        setBooks(fetchedBooks);
        console.log("Books fetched");
      });
  }, []);

  const handleRunServer = () => {
    fetch("https://library-server-node.onrender.com/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setServerStatus(data)
      });
  }

  return (
    <section className={classes.listContainer}>
      <div className={classes.titleStyling}>
        <p className={classes.title}>This app is designed for Node.js development.</p>
        <p>Please click on run server to run the backend server.</p>
        <button onClick={handleRunServer} className={classes.btnStyle}>Run Server</button>
        <p>{serverStatus ? serverStatus : ""}</p>
      </div>

      <ul className={classes.bookList}>
        {books?.map((book, index) => {
          return <BookItem key={index} book={book} />;
        })}
      </ul>
    </section>
  );
}

export default BookList;
