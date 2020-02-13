/***
 * Service for use TheMovieDb API
 */
import axios from "axios";
export const baseUrl = "https://api.themoviedb.org";
export const BASE_URL_IMAGE = "https://image.tmdb.org/t/p/w300";

export default {
  getConfig: () =>
    axios
      .get(`${baseUrl}/3/configuration`, {
        params: { api_key: process.env.REACT_APP_MOVIE_API_KEY }
      })
      .then(res => res.data)
      .catch(error => console.log(error)),
  getLatestMovies: (page = 1) =>
    axios
      .get(`${baseUrl}/3/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          sort_by: "popularity.desc",
          page: page
        }
      })
      .then(res => res.data)
      .catch(error => console.log(error)),
  getLatestMoviesByGenre: (genre, page = 1) =>
    axios
      .get(`${baseUrl}/3/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          sort_by: "popularity.desc",
          page: page,
          with_genres: genre
        }
      })
      .then(res => res.data)
      .catch(error => console.log(error)),
  getLatestSeries: (page = 1) =>
    axios
      .get(`${baseUrl}/3/discover/tv`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          sort_by: "popularity.desc",
          page: page
        }
      })
      .then(res => res.data)
      .catch(error => console.log(error)),
  getLatestSeriesByGenre: (genre, page = 1) =>
    axios
      .get(`${baseUrl}/3/discover/tv`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          sort_by: "popularity.desc",
          page: page,
          with_genres: genre
        }
      })
      .then(res => res.data)
      .catch(error => console.log(error)),
  getGenres: () =>
    axios
      .all([
        axios.get(`${baseUrl}/3/genre/movie/list`, {
          params: { api_key: process.env.REACT_APP_MOVIE_API_KEY }
        }),
        axios.get(`${baseUrl}/3/genre/tv/list`, {
          params: { api_key: process.env.REACT_APP_MOVIE_API_KEY }
        })
      ])
      .then(res => {
        console.log('res', res);
        return {
          movie: res[0].data.genres,
          serie: res[1].data.genres,
          full: res.reduce((acc, data) => [...acc, data.data.genres].flat(), [])
        }
      })
      .catch(error => console.log(error))
};
