import React from "react";
import Theater from "./Theater";

function TheaterList({ theaters = [] }) {
  if (theaters.length) {
    return (
      <section className="mt-4">
        <h4>Now Showing Here</h4>
        <div className="row">
          {theaters.map((theater) => (
            <Theater key={theater.theater_id} theater={theater} />
          ))}
        </div>
      </section>
    );
  }
  return null;
}

export default TheaterList;
