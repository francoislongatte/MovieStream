import React, { Component } from 'react';
import { connect } from "react-redux";
import Routes from './route/routes';
import Header from './components/header/Header';
import { bindActionCreators } from 'redux'

// Import Actions from MovieApi
import { ActionsMovieConnect } from "./redux/actions/moviedb";

class App extends Component {
  componentDidMount(){
    this.props.initApp();
  }
  render(){
    return (
      <>
        <Header />
        <Routes />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionsMovieConnect, dispatch)
};

export default connect(null, mapDispatchToProps)(App);