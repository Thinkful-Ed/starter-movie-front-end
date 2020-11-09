import React, { useEffect, useState } from "react";
const { REACT_APP_API_URL: API_URL } = process.env;

function MoviesList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const url = `${API_URL}/movies?is_showing=true`;
      const response = await fetch(url);
      return response.json();
    }

    loadMovies().then(({ data }) => setMovies(data));
  }, []);

  const list = movies.map((movie) => (
    <article key={movie.movie_id} className="col-sm-12 col-md-6 col-lg-3 my-2">
      <img
        alt={`${movie.title} Poster`}
        className="rounded"
        src={movie.image_url}
        style={{ width: "100%" }}
      />
      <h3 className="font-poppins-heading text-center mt-2">{movie.title}</h3>
    </article>
  ));

  return (
    <main className="container">
      <h2 className="font-poppins">Now Showing</h2>
      <hr />
      <section className="row">{list}</section>
    </main>
  );
}

export default MoviesList;
