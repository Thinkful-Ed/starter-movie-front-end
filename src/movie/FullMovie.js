import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import ReviewList from "./ReviewList";
import TheaterList from "./TheaterList";

const { REACT_APP_API_URL: API_URL } = process.env;

async function loadMovie(movieId) {
  const url = `${API_URL}/movies/${movieId}?included=theaters&included=reviews&included=critics`;
  const response = await fetch(url);
  return response.json();
}

function FullMovie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    loadMovie(movieId).then(({ data }) => setMovie(data));
  }, [movieId]);

  const updateReviewScore = async (
    { movie_id: movieId, review_id: reviewId },
    newScore
  ) => {
    const url = `${API_URL}/reviews/${reviewId}`;
    const body = JSON.stringify({ score: newScore });
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return loadMovie(movieId).then(({ data }) => setMovie(data));
  };

  const deleteReview = async ({ movie_id: movieId, review_id: reviewId }) => {
    const url = `${API_URL}/reviews/${reviewId}`;
    await fetch(url, { method: "DELETE" });
    return loadMovie(movieId).then(({ data }) => setMovie(data));
  };

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
          {movie.reviews && movie.reviews.length ? (
            <ReviewList
              reviews={movie.reviews}
              deleteReview={deleteReview}
              updateReviewScore={updateReviewScore}
            />
          ) : null}
        </aside>
      </section>
    </div>
  );
}

export default FullMovie;
