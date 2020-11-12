import React from "react";

function Theater({ theater }) {
  return (
    <article className="col-sm-12 col-md">
      <h5>{theater.name}</h5>
      <address>
        {theater.address_line_1}
        <br />
        {theater.address_line_2 ? theater.address_line_2 : null}
        {theater.city}, {theater.state} {theater.zip}
      </address>
    </article>
  );
}

export default Theater;
