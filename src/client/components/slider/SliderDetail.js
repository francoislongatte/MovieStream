import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { ActionsTorrentConnect } from "../../redux/actions/torrent";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { BASE_URL_IMAGE } from "../../services/ApiMovieDb";
import { push } from "connected-react-router";

class SliderDetails extends Component {
  render() {
    let info;
    const { nameList, listItem, selected, genres } = this.props;
    const conditionOpenSelected =
      selected !== null &&
      selected.name === nameList &&
      listItem.some(id => id === selected.data.id);
    if (conditionOpenSelected) {
      info = (
        <div className="pure-g">
          <div className="pure-u-6-24">
            <div className="l-box boxImage">
              <img src={`${BASE_URL_IMAGE + selected.data.poster_path}`} />
            </div>
          </div>
          <div className="pure-u-16-24">
            <div className="l-box ">
              <h1>
                {selected.data.name || selected.data.title} <span>( {selected.data.first_air_date || selected.data.release_date} )</span>
              </h1>
              {selected.data.genre_ids.map((id, index) => (
                <span key={index}>
                  {(index > 0 ? " - " : "") +
                    genres.find(idGenre => idGenre.id === id).name}
                </span>
              ))}
              <h2>Synopsis</h2>
              <p>{selected.data.overview}</p>
              <a className="pure-button" onClick={() => this.props.redirectToSearch((selected.data.name || selected.data.title))}>Search torrent</a>
            </div>
          </div>
        </div>
      );
    }
    return (
      <CSSTransition
        in={conditionOpenSelected}
        timeout={200}
        classNames="sd sliderDetails"
      >
        <div>{info}</div>
      </CSSTransition>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.movieDb.genres.full,
    selected: state.movieDb.selected,
    torrentList: state.torrent.torrentById
  };
};

const mapDispatchToProps = dispatch => {
  return {
    torrentApi: bindActionCreators(ActionsTorrentConnect, dispatch),
    redirectToSearch: (id) => dispatch(push(`/torrent/${id}`))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SliderDetails);
