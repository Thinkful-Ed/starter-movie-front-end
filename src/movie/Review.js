import React from "react";
import { markdown } from "markdown";

function Review({ review, deleteReview, updateReviewScore }) {
  const handleIncreaseClick = (review) => {
    const score = review.score + 1;
    if (score > 5) return;
    updateReviewScore(review, score);
  };

  const handleDecreaseClick = (review) => {
    const score = review.score - 1;
    if (score < 1) return;
    updateReviewScore(review, score);
  };

  const handleDeleteReview = (review) => deleteReview(review);

  const scoreButtonStyle = {
    padding: "0 0px 5px 5px",
  };

  const { critic } = review;

  return (
    <section className="border p-4 mb-4">
      <h4>
        {critic.preferred_name} {critic.surname}
        <small> of {critic.organization_name}</small>
      </h4>
      <p
        dangerouslySetInnerHTML={{ __html: markdown.toHTML(review.content) }}
      ></p>
      <p>
        <strong>Rating:</strong> {review.score}
        <button
          className="btn btn-link"
          style={scoreButtonStyle}
          onClick={() => handleIncreaseClick(review)}
        >
          ↑
        </button>
        <button
          className="btn btn-link"
          style={scoreButtonStyle}
          onClick={() => handleDecreaseClick(review)}
        >
          ↓
        </button>
      </p>

      <button
        className="btn btn-danger"
        onClick={() => handleDeleteReview(review)}
      >
        Destroy Review
      </button>
    </section>
  );
}

export default Review;
