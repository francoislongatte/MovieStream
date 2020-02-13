/***
 * Service for use YTS.LT API
 */

import axios from 'axios';
import {apiToMovie} from './DtoYtsDb';
import {listGenres} from '../utils/listGenres';
export const baseUrl = "https://yts.lt/api/v2"


export default {
    getLatestMovies: () =>
        axios.get(`${baseUrl}/list_movies.json`, {
            params: {
                "sort_by": "like_count",
            }
        })
        .then(res => {
            return apiToMovie(res.data)
        })
        .catch(error => console.log(error)),
    getGenresMovies: (genre) =>
        axios.get(`${baseUrl}/list_movies.json`, {
            params: {
                "genre": genre,
            }
        })
        .then(res => {
            return apiToMovie(res.data)
        })
        .catch(error => console.log(error)),
    getGenres: () => listGenres,
    Search: (query) =>
        axios.get(`${baseUrl}/3/search/movie`, {
            params: { query, api_key: process.env.REACT_APP_MOVIE_API_KEY }
        })
        .then(res => res.data)
        .catch(error => console.log(error)),
}