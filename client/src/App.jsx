import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("1");
  const [changing, setChanging] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (changing) {
      setMovies(
        movies.map((movie, i) => (i === editId ? { title, rating } : movie))
      );
      setChanging(false);
      setEditId(null);
    } else {
      setMovies([...movies, { title, rating }]);
    }

    setTitle("");
    setRating("1");
  };

  const handleEdit = (i) => {
    setChanging(true);
    setEditId(i);
    setTitle(movies[i].title);
    setRating(movies[i].rating);
  };

  const handleDelete = (i) => {
    setMovies(movies.filter((_, i) => i !== i));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Movie Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          name="ratings"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button type="submit">{changing ? "Update" : "Submit"}</button>
      </form>

      <div>
        {movies.map((movie, i) => (
          <div key={i} className="movie-item">
            <h3>
              Movie Title: {movie.title} (Rating: {movie.rating})
            </h3>
            <div>
              <button onClick={() => handleEdit(i)}>Edit</button>
              <button onClick={() => handleDelete(i)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
