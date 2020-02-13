import { push } from "connected-react-router";

import ApiConnect from "../../services/ApiTorrent";

export const SEARCH_TORRENT_BY_QUERY = "SEARCH_TORRENT_BY_QUERY";
export const SEARCH_MAGNET_BY_TORRENT = "SEARCH_MAGNET_BY_TORRENT";
export const START_SEARCH_TORRENT = "START_SEARCH_TORRENT";
export const DONE_SEARCH_TORRENT = "DONE_SEARCH_TORRENT";
export const CLEAN_SEARCH_TORRENT = "CLEAN_SEARCH_TORRENT";
export const SAVE_SEARCH_QUERY_TORRENT = "SAVE_SEARCH_QUERY_TORRENT"

/*
 * action creators connect
 */

export function searchTorrentByQuery(query, category = 'Movies') {
  return async dispatch => {
    dispatch({ type: START_SEARCH_TORRENT });
    await ApiConnect.getTorrentBySearch(query,category)
      .then(resultSearchTorrents => {
        dispatch({ type: DONE_SEARCH_TORRENT });
        dispatch({
          type: SEARCH_TORRENT_BY_QUERY,
          payload: { resultSearchTorrents }
        });
      })
      .catch(err => {
        dispatch({ type: DONE_SEARCH_TORRENT });
      });
  };
}

export function searchMagnetByTorrent(torrent) {
  return async dispatch => {
    await ApiConnect.getMagnetFromTorrent(torrent).then(resultSearchMagnet => {
      if (resultSearchMagnet) {
        dispatch({
          type: SEARCH_MAGNET_BY_TORRENT,
          payload: resultSearchMagnet
        });

        dispatch(push("/player"));
      }
    });
  };
}

export function searchMagnetClipboard(torrent){
  return async dispatch => {
    await ApiConnect.getMagnetFromTorrent(torrent).then(resultSearchMagnet => {
        navigator.clipboard.writeText(resultSearchMagnet).then(() => alert("Magnet is copy to clipboard"))
        dispatch({
          type: SEARCH_MAGNET_BY_TORRENT,
          payload: resultSearchMagnet
        });
    });
  };
}

export const ActionsTorrentConnect = {
  searchTorrentByQuery,
  searchMagnetByTorrent,
  searchMagnetClipboard
};

/*
 * action creators hook
 */

export function startSearchTorrent() {
  return {
    type: START_SEARCH_TORRENT
  };
}

export function DoneSearchTorrent() {
  return {
    type: DONE_SEARCH_TORRENT
  };
}

export function CleanSearchTorrent() {
  return {
    type: CLEAN_SEARCH_TORRENT
  };
}

export function SaveSearchQueryTorrent(query) {
  return {
    type: SAVE_SEARCH_QUERY_TORRENT,
    payload: query
  };
}
