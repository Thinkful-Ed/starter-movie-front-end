const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

function populateReviews(signal) {
  return async (movie) => {
    const url = `${API_BASE_URL}/movies/${movie.movie_id}/reviews`;
    movie.reviews = await fetchJson(url, { headers, signal }, []);
    return movie;
  };
}

function populateTheaters(signal) {
  return async (movie) => {
    const url = `${API_BASE_URL}/movies/${movie.movie_id}/theaters`;
    movie.theaters = await fetchJson(url, { headers, signal }, []);
    return movie;
  };
}

/**
 * Retrieves all existing movies and populates the `reviews` property
 * @returns {Promise<[movie]>}
 *  a promise that resolves to a possibly empty array of movies saved in the database.
 */
export async function listMovies(signal) {
  const url = new URL(`${API_BASE_URL}/movies?is_showing=true`);
  const addReviews = populateReviews(signal);
  return await fetchJson(url, { headers, signal }, []).then((movies) =>
    Promise.all(movies.map(addReviews))
  );
}

/**
 * Retrieves all existing theaters
 * @returns {Promise<[theater]>}
 *  a promise that resolves to a possibly empty array of theaters saved in the database.
 */
export async function listTheaters(signal) {
  const url = new URL(`${API_BASE_URL}/theaters`);
  return await fetchJson(url, { headers, signal }, []);
}

/**
 * Retrieves all existing movies and populates the `reviews` property
 * @returns {Promise<[movie]>}
 *  a promise that resolves to a possibly empty array of movies saved in the database.
 */
export async function readMovie(movieId, signal) {
  const url = new URL(`${API_BASE_URL}/movies/${movieId}`);
  const addReviews = populateReviews(signal);
  const addTheaters = populateTheaters(signal);
  return await fetchJson(url, { headers, signal }, [])
    .then(addReviews)
    .then(addTheaters);
}

export async function deleteReview(reviewId) {
  const url = `${API_BASE_URL}/reviews/${reviewId}`;
  return await fetchJson(url, { method: "DELETE", headers }, {});
}

export async function updateReview(reviewId, data) {
  const url = `${API_BASE_URL}/reviews/${reviewId}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data }),
  };
  return await fetchJson(url, options, {});
}
