import React from "react";

function averageReviewRating(reviews = []) {
  if (reviews.length) {
    const total = reviews.reduce((sum, review) => sum + review.score, 0);
    return Math.round(total / reviews.length);
  }
  return "N/A";
}

function AverageRating({ reviews = [] }) {
  return (
    <p>
      <strong>Average Review Rating:</strong> {averageReviewRating(reviews)}
    </p>
  );
}

export default AverageRating;
