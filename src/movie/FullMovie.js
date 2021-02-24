import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "./Details";
import ReviewList from "./ReviewList";
import TheaterList from "./TheaterList";
import { deleteReview, readMovie, updateReview } from "../utils/api";
import ErrorAlert from "../shared/ErrorAlert";

function FullMovie() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovie(movieId);
  }, [movieId]);

  function loadMovie(movieId) {
    setError(null);
    const abortController = new AbortController();
    readMovie(movieId, abortController.signal).then(setMovie).catch(setError);
    return () => abortController.abort();
  }

  function deleteReviewHandler({ movie_id: movieId, review_id: reviewId }) {
    deleteReview(reviewId).then(() => loadMovie(movieId));
  }

  function updateScoreHandler(
    { movie_id: movieId, review_id: reviewId },
    score
  ) {
    console.log("score", reviewId, score);
    updateReview(reviewId, { score }).then(() => loadMovie(movieId));
  }

  return (
    <div className="container">
      <ErrorAlert error={error} />
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
          <TheaterList theaters={movie.theaters} />
          <ReviewList
            reviews={movie.reviews}
            deleteReview={deleteReviewHandler}
            setReviewScore={updateScoreHandler}
          />
        </aside>
      </section>
    </div>
  );
}

export default FullMovie;
