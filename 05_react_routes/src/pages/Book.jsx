// src/pages/Book.jsx
import { useParams } from "react-router-dom";

const Book = () => {
  const { bookId } = useParams();

  return (
    <div className="centered">
      <h1>bookId: {bookId}</h1>
    </div>
  );
};

export default Book;
