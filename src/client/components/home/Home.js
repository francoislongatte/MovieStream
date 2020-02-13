import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { bindActionCreators } from "redux";
import "./Home.scss";
import { LATEST_MOVIES,LATEST_SERIES } from "../../redux/reducers/movieDb";

import Slider from "../slider/Slider";

// Import Actions from MovieApi
import { ActionsMovieConnect } from "../../redux/actions/moviedb";

//backdrop_path
//poster_path

class Home extends Component {
  render() {
    let moviesSlider, seriesSlider;
    const { movies, series } = this.props;
    if(movies.length > 0){
      moviesSlider = movies.map((movieData,index) => (<Slider key={index} nameList={LATEST_MOVIES} h1={index < 1 ? "Popular movies" : ""} listItem={movieData.results} selected={this.props.selected} />))
    }
    if(series.length > 0){
      seriesSlider = series.map((serieData,index) => (<Slider key={index} nameList={LATEST_SERIES} h1={index < 1 ? "Popular series" : ""} listItem={serieData.results} selected={this.props.selected} />))
    }

    return (<>
        {moviesSlider}
        {seriesSlider}
    </>)
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movieDb.LATEST_MOVIES,
    series: state.movieDb.LATEST_SERIES,
    selected: state.movieDb.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      redirectToAbout: () => dispatch(push("about"))
    },
    movieApi: bindActionCreators(ActionsMovieConnect, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);