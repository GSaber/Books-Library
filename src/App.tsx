import React, { useEffect, useState } from "react";
import "./App.css";
import Book from "./models/book";
import { BOOKS } from "./models/mock-book";

function App() {
  const [library, setLibrary] = useState<Book[]>([]);
  const [myLibrary, setmyLibrary] = useState<Book[]>([]);
  const [displayedbook, setDisplayedBook] = useState<Book | undefined>();
  const [page, setPage] = useState(0);
  const [p, setP] = useState(0);
  const [activeBook, setActiveBook] = useState<string>();

  useEffect(() => {
    setLibrary(BOOKS);
  }, []);

  function handleAddBook(id: number) {
    const isBookFound = myLibrary.find((book) => book.id === id);
    if (isBookFound) {
      alert("Book already in ur collection");
      console.log("", myLibrary[id]?.id, id);
    } else {
      setmyLibrary([...myLibrary, BOOKS[id]]);
    }
  }

  function pagination(clickedBook: Book) {
    return (
      <>
        <button onClick={() => setDisplayedBook(undefined)}>X</button>

        <h2 className="title">Title: "{clickedBook.title}"</h2>
        <p className="page">
          {clickedBook.content.slice(page * 300, (page + 1) * 300)}
        </p>
        <div className="btns">
          {page > 0 && <button onClick={handlePrevious}>{"<"}</button>}

          <button style={{ border: "none" }}>{page + 1}</button>
          {(page + 1) * 300 < clickedBook.content.length && (
            <button onClick={handleNext}>{">"}</button>
          )}
        </div>
      </>
    );

    function handleNext() {
      if (clickedBook)
        if (page < clickedBook.content.length) {
          setPage(page + 1);
        } else return page;
    }
    function handlePrevious() {
      if (page > 0) {
        setPage(page - 1);
      } else return page;
    }
  }
  function next() {
    setP(p + 1);
  }
  function previous() {
    setP(p - 1);
  }
  return (
    <div className="App">
      <div className="books">
        {library.slice(p * 5, (p + 1) * 5).map((book) => (
          <>
            <div
              key={book.id}
              className="card"
              style={{ backgroundImage: `url(${book.image})` }}
            >
              <div className="overlay">
                <h1>{book.title}</h1>
                {/* <img src={book.image} alt={book.title} /> */}
                <button onClick={() => handleAddBook(book.id)}>ADD</button>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="btns">
        {p > 0 && <button onClick={previous}>{"<"}</button>}
        <button>{p}</button>
        {(p + 1) * 5 < library.length && <button onClick={next}>{">"}</button>}
      </div>

      <div className="mylibrary">
        <div className="titles">
          <h3>My library</h3>
          {myLibrary.map((book) => {
            return (
              <div
                className={`book ${activeBook === book.title && "active"}`}
                key={book.title}
                onClick={() => {
                  setDisplayedBook(book);
                  setActiveBook(book.title);
                }}
              >
                {<h3>{book.title}</h3>}
              </div>
            );
          })}
        </div>
        <div className="content">
          {displayedbook && <>{pagination(displayedbook)}</>}
        </div>
      </div>
    </div>
  );
}

export default App;
