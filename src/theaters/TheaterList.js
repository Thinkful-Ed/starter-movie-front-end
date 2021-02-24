import React, { useEffect, useState } from "react";
import Theater from "./Theater";
import ErrorAlert from "../shared/ErrorAlert";
import { listTheaters } from "../utils/api";

function TheaterList() {
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const abortController = new AbortController();
    listTheaters(abortController.signal).then(setTheaters).catch(setError);
    return () => abortController.abort();
  }, []);

  const list = theaters.map((theater) => (
    <Theater key={theater.theater_id} theater={theater} />
  ));

  return (
    <main className="container">
      <ErrorAlert error={error} />
      <h2 className="font-poppins">All Theaters</h2>
      <hr />
      <section className="row">{list}</section>
    </main>
  );
}

export default TheaterList;
