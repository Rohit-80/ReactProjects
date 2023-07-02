import http from "./httpServices";

export function getMovies() {
  return http.get('http://localhost:3900/api/movies');;
}

export function getMovie(id) {
  return http.get('http://localhost:3900/api/movies/' + id);
}

export function saveMovie(movie) {
  if (movie._id) {
    const singlemovie = { ...movie }
    delete singlemovie._id
    console.log(`this is from movie service ${movie}`, singlemovie)
    return http.put('http://localhost:3900/api/movies/' + movie._id, singlemovie);
  }
  return http.post('http://localhost:3900/api/movies', movie)
}

export function deleteMovie(id) {
  return http.delete('http://localhost:3900/api/movies/' + id)
}
