import React from "react";
import Theater from "./Theater";

function TheaterList({ theaters }) {
  console.log("theaters", theaters);
  return (
    <section>
      <h4>Now Showing Here</h4>
      <div className="row">
        {theaters.map((theater) => (
          <Theater key={theater.theater_id} theater={theater} />
        ))}
      </div>
    </section>
  );
}

export default TheaterList;
