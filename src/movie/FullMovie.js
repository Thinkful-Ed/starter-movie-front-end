import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import ReviewList from "./ReviewList";
import TheaterList from "./TheaterList";

const { REACT_APP_API_URL: API_URL } = process.env;

function FullMovie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function loadMovie() {
      const url = `${API_URL}/movies/${movieId}?included=reviews`;
      const response = await fetch(url);
      return response.json();
    }

    loadMovie().then(({ data }) => setMovie(data));
  }, []);

  console.log(movie);
  return (
    <div className="container">
      <section className="row mt-4">
        <article className="col-sm-12 col-md-6 col-lg-3">
          <img
            alt={`${movie.title} Poster`}
            className="rounded"
            src={movie.image_url}
            style={{ width: "100%" }}
          />
        </article>
        <aside className="col-sm-12 col-md-6 col-lg-9">
          <Details movie={movie} />
          {movie.theaters && movie.theaters.length ? (
            <TheaterList theaters={movie.theaters} />
          ) : null}
          <hr />
          {movie.reviews && movie.reviews.length ? (
            <ReviewList reviews={movie.reviews} />
          ) : null}
        </aside>
      </section>
    </div>
  );
}

export default FullMovie;
