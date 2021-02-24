import React from "react";
import AverageRating from "./AverageRating";

function Details({ movie }) {
  return (
    <section>
      <h3 className="font-poppins-heading mb-4">{movie.title}</h3>
      <p>{movie.description}</p>
      <p>
        <strong>Runtime:</strong> {movie.runtime_in_minutes} minutes
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      <AverageRating reviews={movie.reviews} />
    </section>
  );
}

export default Details;
