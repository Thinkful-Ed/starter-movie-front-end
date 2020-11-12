function averageReviewRating(movie) {
  let averageReviewRating = "N/A";

  if (movie.reviews.length) {
    const total = movie.reviews.reduce((acc, review) => acc + review.score, 0);
    averageReviewRating = Math.round(total / movie.reviews.length);
  }

  return averageReviewRating;
}

export default averageReviewRating;
