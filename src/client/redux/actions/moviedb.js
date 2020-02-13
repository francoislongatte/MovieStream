import ApiConnect from "../../services/ApiMovieDb";

/*
 * action types
 */

export const INIT_APP = "INIT_APP";
export const SET_SELECTED_MOVIE = "SET_SELECTED_MOVIE";
export const GET_GENDER_MOVIE = "GET_GENDER_MOVIE";
export const GET_GENDER_SERIE = "GET_GENDER_SERIE";
export const SEARCH_MOVIES_BY_GENDER = "SEARCH_MOVIES_BY_GENDER";
export const SEARCH_SERIES_BY_GENDER = "SEARCH_SERIES_BY_GENDER";

/*
 * action creators connect
 */

function initApp() {
  return async dispatch => {
    const genres = await ApiConnect.getGenres();
    const movies = await Promise.all([ApiConnect.getLatestMovies(1),ApiConnect.getLatestMovies(2)]);
    const series = await Promise.all([ApiConnect.getLatestSeries(1),ApiConnect.getLatestSeries(2)]);
    dispatch({
      type: INIT_APP,
      payload: { genres, movies, series }
    });
  };
}

function getGenderMovie(){
  return async dispatch => {
    const genres = await ApiConnect.getGenresMovie();
    dispatch({
      type: GET_GENDER_MOVIE,
      payload: genres
    })
  }
}

function searchMoviesByGender(gender) {
  return async dispatch => {
    const results = await Promise.all([
      ApiConnect.getLatestMoviesByGenre(gender,1),
      ApiConnect.getLatestMoviesByGenre(gender,2),
      ApiConnect.getLatestMoviesByGenre(gender,3),
      ApiConnect.getLatestMoviesByGenre(gender,4),
      ApiConnect.getLatestMoviesByGenre(gender,5),
      ApiConnect.getLatestMoviesByGenre(gender,6)
    ]);
    console.log(results);
    console.log('search');
    dispatch({
      type: SEARCH_MOVIES_BY_GENDER,
      payload: results
    })
  }
}

function searchSeriesByGender(gender) {
  return async dispatch => {
    const results = await Promise.all([
      ApiConnect.getLatestSeriesByGenre(gender,1),
      ApiConnect.getLatestSeriesByGenre(gender,2),
      ApiConnect.getLatestSeriesByGenre(gender,3),
      ApiConnect.getLatestSeriesByGenre(gender,4),
      ApiConnect.getLatestSeriesByGenre(gender,5),
      ApiConnect.getLatestSeriesByGenre(gender,6)
    ]);
    dispatch({
      type: SEARCH_SERIES_BY_GENDER,
      payload: results
    })
  }
}



export const ActionsMovieConnect = {
  initApp,
  getGenderMovie,
  searchMoviesByGender,
  searchSeriesByGender
};

/*
 * action creators hook
 */

export function setSelected(id, nameList) {
  return {
    type: SET_SELECTED_MOVIE,
    payload: { id, nameList }
  };
}

/***
 * For TheMovieDb
 */

/*
  export const GET_CONFIG = "GET_CONFIG";
  export const GET_GENRES = "GET_GENRES";

  export function getConfig() {
  return async Dispatch => {
    const response = await ApiConnect.getConfig();
    Dispatch({
      type: "GET_CONFIG",
      payload: response
    });
  };
}

function getGenres() {
  return dispatch => {
    const response = ApiConnect.getGenres();
    dispatch({
      type: "GET_GENRES",
      payload: response
    });
  };
}

function getLatestMovies() {
  return async dispatch => {
    const response = await ApiConnect.getLatestMovies();
    dispatch({
      type: "GET_LATEST_MOVIES",
      payload: response.results
    });
  };
}

function getLatestSeries() {
  return async dispatch => {
    const response = await ApiConnect.getLatestSeries();
    dispatch({
      type: "GET_LATEST_SERIES",
      payload: response.results
    });
  };
}
 */
