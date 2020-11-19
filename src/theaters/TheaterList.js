import React, { useEffect, useState } from "react";
import Theater from "./Theater";
const { REACT_APP_API_URL: API_URL } = process.env;

function TheaterList() {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    async function loadTheaters() {
      const url = `${API_URL}/theaters?included=movies`;
      const response = await fetch(url);
      return response.json();
    }

    loadTheaters().then(({ data }) => setTheaters(data));
  }, []);

  const list = theaters.map((theater) => (
    <Theater key={theater.theater_id} theater={theater} />
  ));
  return (
    <main className="container">
      <h2 className="font-poppins">All Theaters</h2>
      <hr />
      <section className="row">{list}</section>
    </main>
  );
}

export default TheaterList;
