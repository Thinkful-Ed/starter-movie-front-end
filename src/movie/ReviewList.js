import React from "react";
import Review from "./Review";

function ReviewList({ reviews }) {
  return (
    <section>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <Review key={review.review_id} review={review} />
      ))}
    </section>
  );
}

export default ReviewList;
