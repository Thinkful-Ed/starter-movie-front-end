import React from "react";
import averageReviewRating from "../utils/averageReviewRating";

function Details({ movie }) {
  return (
    <section>
      <h3 className="font-poppins-heading mb-4">{movie.title}</h3>
      <p>{movie.description}</p>
      <p>
        <strong>Runtime:</strong> {movie.runtime} minutes
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      {movie.reviews && movie.reviews.length && (
        <p>
          <strong>Average Review Rating:</strong> {averageReviewRating(movie)}
        </p>
      )}
    </section>
  );
}

export default Details;
