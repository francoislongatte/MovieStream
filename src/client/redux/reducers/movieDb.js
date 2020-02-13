import { INIT_APP, SET_SELECTED_MOVIE, GET_GENDER_MOVIE, GET_GENDER_SERIE, SEARCH_MOVIES_BY_GENDER, SEARCH_SERIES_BY_GENDER } from '../actions/moviedb';

// name use to link on good list for selected slide
export const LATEST_MOVIES = "LATEST_MOVIES";
export const LATEST_SERIES = "LATEST_SERIES";
export const MOVIESBYGENRE = "MOVIESBYGENRE";
export const SERIESBYGENRE = "SERIESBYGENRE";

const initialState = {
  genres: {
    movie: [],
    serie: [],
    full: []
  },
  LATEST_MOVIES: [],
  LATEST_SERIES: [],
  MOVIESBYGENRE: [],
  SERIESBYGENRE: [],
  selected: null
};

export default function movieDb(state = initialState, action) {
  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        genres: {
          movie: action.payload.genres.movie,
          serie: action.payload.genres.serie,
          full: action.payload.genres.full
        },
        LATEST_MOVIES: action.payload.movies,
        LATEST_SERIES: action.payload.series
      }
    case SET_SELECTED_MOVIE:
      const searchArray = state[action.payload.nameList].reduce((acc, array) => {
        acc.push(array.results)
        return acc;
      }, []).flat().find(movie => movie.id === action.payload.id);
      return {
        ...state,
        selected: { name: action.payload.nameList, data: searchArray }
      }
    case GET_GENDER_MOVIE:
      return {
        ...state,
        genres: {
          ...state.genres,
          movie: action.payload.genres
        }
      }
    case GET_GENDER_SERIE:
      return {
        ...state,
        genres: {
          ...state.genres,
          serie: action.payload.genres
        }
      }
    case SEARCH_MOVIES_BY_GENDER:
      return {
        ...state,
        MOVIESBYGENRE: [
          ...action.payload
        ]
      }
    case SEARCH_SERIES_BY_GENDER:
      return {
        ...state,
        SERIESBYGENRE: [
          ...action.payload
        ]
      }
    default:
      return state;
  }
}