import React from "react";

function Theater({ theater }) {
  return (
    <article className="col-sm-12 col-md">
      <div className="card">
        <div className="card-body">
          <h5>{theater.name}</h5>
          <address>
            {theater.address_line_1}
            <br />
            {theater.address_line_2 ? theater.address_line_2 : null}
            {theater.city}, {theater.state} {theater.zip}
          </address>
        </div>
      </div>
    </article>
  );
}

export default Theater;
