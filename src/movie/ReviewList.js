import React from "react";
import Review from "./Review";

function ReviewList({ reviews, deleteReview, updateReviewScore }) {
  reviews = reviews.sort((reviewA, reviewB) => {
    const nameA = reviewA.critic.preferred_name;
    const nameB = reviewB.critic.preferred_name;
    if (nameA[0] > nameB[0]) {
      return 1;
    } else if (nameA[0] < nameB[0]) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <section className="mt-4">
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <Review
          key={review.review_id}
          review={review}
          deleteReview={deleteReview}
          updateReviewScore={updateReviewScore}
        />
      ))}
    </section>
  );
}

export default ReviewList;
