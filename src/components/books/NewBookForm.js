import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewBookForm.module.css";

// import BookContext from "../../store/book-context";

function NewBookForm() {
  const navigate = useNavigate();
  // const booksCtx = useContext(BookContext);
  const title = useRef();
  const author = useRef();
  const image = useRef();
  const year = useRef();
  const description = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = title.current.value;
    const enteredAuthor = author.current.value;
    const enteredImage = image.current.value;
    const enteredYear = year.current.value;
    const enteredDescription = description.current.value;

    const newBook = {
      title: enteredTitle,
      author: enteredAuthor,
      imageUrl: enteredImage,
      year: enteredYear,
      description: enteredDescription,
    };

    fetch("http://localhost:8080/book", {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      navigate("/");
    });

    // booksCtx.addBook(newBook);
    // booksCtx.setBooks((prevBooks) => [
    //   ...prevBooks,
    //   { _id: newBook._id, ...newBook },
    // ]);
    // navigate("/");
  }

  return (
    <form className={classes.formContainer} onSubmit={submitHandler}>
      <div className={classes.inputField}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={title} />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="author">Author</label>
        <input type="text" id="author" ref={author} />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="image">Image</label>
        <input type="text" id="image" ref={image} />
      </div>
      <div className={classes.inputField}>
        <label htmlFor="year">Year</label>
        <input type="number" id="year" ref={year} />
      </div>
      <div className={classes.description}>
        <label htmlFor="description">Description</label>
        <textarea id="description" ref={description}></textarea>
      </div>
      <div>
        <button className={classes.btn}>Add Book</button>
      </div>
    </form>
  );
}

export default NewBookForm;
