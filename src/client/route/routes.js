import React, { Component } from "react";
import { Switch, Route } from "react-router";
import "./routes.scss";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

import Home from "../components/home/Home";
import Movies from "../components/movie&serie/movies/Movies";
import Series from "../components/movie&serie/series/Series";
import Torrent from "../components/torrent/Torrent";
import Player from "../components/Player/Player";
import PlayerGuard from "./PlayerGuard";
import Error from "../components/Error";

class Routes extends Component {
    
  render() {
    return (
      <main
        className={this.props.routeName === "/" ? "content banner" : "content"}
      >
        <TransitionGroup>
          <CSSTransition
            classNames={"fade"}
            key={this.props.location}
            timeout={{ enter: 300, exit: 0 }}
          >
            <Switch location={this.props.location}>
              <Route path="/" component={Home} exact />
              <Route path="/movies" component={Movies} />
              <Route path="/series" component={Series} />
              <Route exact path="/torrent" component={Torrent} />
              <Route exact path="/torrent/:search" component={Torrent} />
              <PlayerGuard
                exact
                path="/player"
                component={Player}
                selected={this.props.torrentMagnet}
              ></PlayerGuard>
              <Route component={Error} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.router.location,
    torrentMagnet: state.torrent.torrentMagnet
  };
};

export default connect(mapStateToProps, null)(Routes);
