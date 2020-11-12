import React from "react";
import { markdown } from "markdown";

function Review({ review }) {
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
      </p>
    </section>
  );
}

export default Review;
