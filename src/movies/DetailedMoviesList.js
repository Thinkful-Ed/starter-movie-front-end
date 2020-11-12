import React, { useEffect, useState } from "react";
import DetailedMovie from "./DetailedMovie";
const { REACT_APP_API_URL: API_URL } = process.env;

function DetailedMoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const url = `${API_URL}/movies?included=reviews`;
      const response = await fetch(url);
      return response.json();
    }

    loadMovies().then(({ data }) => setMovies(data));
  }, []);

  const list = movies.map((movie) => (
    <DetailedMovie key={movie.movie_id} movie={movie} />
  ));
  return (
    <main className="container">
      <h2 className="font-poppins">All Movies</h2>
      <hr />
      <section>{list}</section>
    </main>
  );
}

export default DetailedMoviesList;
