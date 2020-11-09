import React, { useEffect, useState } from "react";
const { REACT_APP_API_URL: API_URL } = process.env;

function DetailedMoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const url = `${API_URL}/movies`;
      const response = await fetch(url);
      return response.json();
    }

    loadMovies().then(({ data }) => setMovies(data));
  }, []);

  const list = movies.map((movie) => (
    <section className="row mt-4" key={movie.movie_id}>
      <article className="col-sm-12 col-md-6 col-lg-3">
        <img
          alt={`${movie.title} Poster`}
          className="rounded"
          src={movie.image_url}
          style={{ width: "100%" }}
        />
      </article>
      <aside className="col-sm-12 col-md-6 col-lg-9">
        <h3 className="font-poppins-heading mb-4">{movie.title}</h3>
        <p>{movie.description}</p>
        <p>
          <strong>Runtime:</strong> {movie.runtime} minutes
        </p>
        <p>
          <strong>Rating:</strong> {movie.rating}
        </p>
      </aside>
    </section>
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
