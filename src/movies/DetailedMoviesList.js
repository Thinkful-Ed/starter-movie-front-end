import React, { useEffect, useState } from "react";
import DetailedMovie from "./DetailedMovie";
import ErrorAlert from "../shared/ErrorAlert";
import { listMovies } from "../utils/api";

function DetailedMoviesList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const abortController = new AbortController();
    listMovies(abortController.signal).then(setMovies).catch(setError);

    return () => abortController.abort();
  }, []);

  const list = movies.map((movie) => (
    <DetailedMovie key={movie.movie_id} movie={movie} />
  ));

  return (
    <main className="container">
      <ErrorAlert error={error} />
      <h2 className="font-poppins">All Movies</h2>
      <hr />
      <section>{list}</section>
    </main>
  );
}

export default DetailedMoviesList;
