import React, { Component } from "react";
import { connect } from "react-redux";
import "./Torrent.scss";
import { bindActionCreators } from "redux";
import {
  ActionsTorrentConnect,
  CleanSearchTorrent,
  SaveSearchQueryTorrent
} from "../../redux/actions/torrent";
import { AiOutlineLoading } from "react-icons/ai";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    const searchRoute = this.props.match.params.search;
    if (searchRoute) {
      console.log(searchRoute, this.props.torrentQuerySearch);
      if (searchRoute !== this.props.torrentQuerySearch) {
        this.props.cleanTorrentSearch();
        this.state.value = searchRoute;
        this.props.torrentApi.searchTorrentByQuery(this.state.value);
        this.props.SaveSearchQueryTorrent(this.state.value);
      }
    } else {
      this.props.cleanTorrentSearch();
    }
  }

  copyToClipboard = (e, torrent) => {
    this.props.torrentApi.searchMagnetClipboard(torrent);
    navigator.permissions.query({
      name: 'clipboard-write'
    }).then(permissionStatus => {
      // Will be 'granted', 'denied' or 'prompt':
      console.log(permissionStatus.state);
      if(permissionStatus.state === 'granted'){
        
      }
      // Listen for changes to the permission state
      permissionStatus.onchange = () => {
        console.log(permissionStatus.state);
      };
    });
    
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.torrentApi.searchTorrentByQuery(this.state.value);
    event.preventDefault();
  }

  render() {
    let list;
    let loaderSearch;

    if (this.props.torrentList) {
      list = this.props.torrentList.map((torrent, index) => (
        <tr key={index} className={index % 2 === 0 ? "pure-table-odd" : ""}>
          <td>{index}</td>
          <td>{torrent.title}</td>
          <td>{torrent.size}</td>
          <td>{torrent.seeds}</td>
          <td>{torrent.peers}</td>
          <td>{torrent.provider}</td>
          <td>
            <button
              onClick={() =>
                this.props.torrentApi.searchMagnetByTorrent(torrent)
              }
              className="pure-button"
            >
              Lecture
            </button>
          </td>
          <td>
            <button
              onClick={e => this.copyToClipboard(e, torrent)}
              className="pure-button"
            >
              Magnet
              <span className="tooltip tooltiptext">
                Copy to clipboard
              </span>
            </button>
          </td>
        </tr>
      ));
    }
    if (this.props.torrentLoad) {
      loaderSearch = (
        <span className="iconLoading">
          <AiOutlineLoading />
        </span>
      );
    } else {
      loaderSearch = "Search";
    }
    // const { counter } = this.props;
    return (
      <div className="table">
        <form className="pure-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="pure-button"
            disabled={this.props.torrentLoad}
          >
            {loaderSearch}
          </button>
          <p>La requete peut être longue. (+- 10s)</p>
        </form>

        <table className="pure-table pure-table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>size</th>
              <th>seeds</th>
              <th>peers</th>
              <th>provider</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    torrentList: state.torrent.torrentSearch,
    torrentLoad: state.torrent.torrentLoad,
    torrentQuerySearch: state.torrent.torrentQuerySearch,
    torrentMagnet: state.torrent.torrentMagnet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    torrentApi: bindActionCreators(ActionsTorrentConnect, dispatch),
    cleanTorrentSearch: () => dispatch(CleanSearchTorrent()),
    SaveSearchQueryTorrent: query => dispatch(SaveSearchQueryTorrent(query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
