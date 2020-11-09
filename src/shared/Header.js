import React from "react";
import HeaderNav from "./HeaderNav";
import headerImage from "./header.jpg";

function Header() {
  const style = {
    background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url(${headerImage})`,
    backgroundPosition: "center",
    backgroundSize: "100% auto",
  };

  return (
    <div
      className="jumbotron jumbotron-fluid text-white border-bottom border-dark pt-0"
      style={style}
    >
      <HeaderNav />
      <div className="container">
        <h1 className="display-4">Find your next favorite movie!</h1>
        <p className="lead">
          <em>WeLoveMovies</em> is your source for finding reviews of movies in
          theatres near you.
        </p>
      </div>
    </div>
  );
}

export default Header;
