import React, { Component } from "react";
import WebTorrent from "webtorrent-hybrid";
import "./Player.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import { goBack } from "connected-react-router";

class Player extends Component {
  client = new WebTorrent();
  state = {
    torrentMagnet: "",
    torrentId: "",
    torrentInfoHash: "",
    torrentMagnetURI: "",
    torrentName: "",
    torrentProgress: "",
    torrentFiles: [],
    torrentNumPeers: "",
    torrentWire: [],
    torrentReady: false
  };

  constructor(props) {
    super(props);
    this.state.torrentMagnet = this.props.magnet;
    console.log(this.props.magnet);
  }

  componentDidMount() {
    this.client.on("error", err => {
      console.log("[+] Webtorrent error: " + err.message);
    });

    this.client.on("torrent", torrent => {
      console.log("TORRENT LAUNCH");
      this.setState({
        ...this.state,
        torrentReady: true
      });
    });

    this.client.add(this.state.torrentMagnet, { maxWebConns: 10 }, torrent => {
      torrent.on("done", () => {
        console.log("Progress: 100%");
      });

      torrent.on("download", bytes => {
        this.setState({
          ...this.state,
          torrentProgress: (torrent.progress * 100).toFixed(1) + "%"
        });
      });

      torrent.on("wire", addr => {
        this.setState({
          ...this.state,
          torrentWire: this.state.torrentWire.concat(
            `connected to peer with address ${addr}`
          )
        });
      });

      this.setState({
        ...this.state,
        torrentInfoHash: torrent.infoHash,
        torrentMagnetURI: torrent.magnetURI,
        torrentName: torrent.name,
        torrentFiles: torrent.files,
        torrentNumPeers: torrent.numPeers
      });

      this.state.torrentFiles.map((file, i) => {
        file.appendTo(".videoPlayer");
        return file;
      });
    });
  }

  componentWillUnmount() {
    this.client.destroy();
  }

  render() {
    let MessageOrLoad;
    if (WebTorrent.WEBRTC_SUPPORT) {
      if (!this.state.torrentReady) {
        MessageOrLoad = (
          <div className="boxLoading">
            <p>it can be take a long time</p>
            <button
                className="pure-button"
                onClick={() => this.props.goBack()}
              >
                <FaAngleLeft />
              </button>
            <i className="playerIconLoading">
              <AiOutlineLoading />
            </i>
          </div>
        );
      }
    } else {
      MessageOrLoad = (
        <p>
          Pour la visualisation du torrent, veuillez utiliser un navigateur
          compatible avec "WEBRTC"
        </p>
      );
    }
    return (
      <>
        {MessageOrLoad}
        <div className="pure-g containerVideo">
          <div className="pure-u-6-24">
            <FaAngleLeft onClick={() => this.props.goBack()} />
            <p>it can be take a long time. it's looking for peers for streaming. It can be without result.</p>
            <h1>{this.state.torrentName}</h1>
            <p>
              <b>Torrent Info Hash: </b>
              {this.state.torrentInfoHash}
            </p>
            <p>
              <b>Torrent Progress: </b>
              {this.state.torrentProgress}
            </p>
            <p>
              <b>Torrent Num Peer: </b>
              {this.state.torrentNumPeers}
            </p>
            <ul>
              <b>Torrent Num Peer: </b>
              {this.state.torrentWire.map((wire, i) => (
                <li key={i}>${wire}</li>
              ))}
            </ul>
          </div>
          <div className="pure-u-18-24">
            <div className="videoPlayer"></div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    magnet: state.torrent.torrentMagnet
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goBack: () => dispatch(goBack())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
