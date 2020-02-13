import {
  SEARCH_TORRENT_BY_QUERY,
  SEARCH_MAGNET_BY_TORRENT,
  START_SEARCH_TORRENT,
  DONE_SEARCH_TORRENT,
  CLEAN_SEARCH_TORRENT,
  SAVE_SEARCH_QUERY_TORRENT
} from "../actions/torrent";

const initialState = {
  torrentSearch: [],
  torrentLoadInfo: [],
  torrentLoad: false,
  torrentMagnet: "",
  torrentQuerySearch: ""
};

export default function torrent(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TORRENT_BY_QUERY:
      return {
        ...state,
        torrentSearch: [
          ...state.torrentSearch,
          ...action.payload.resultSearchTorrents
        ]
      };
    case SEARCH_MAGNET_BY_TORRENT:
      return {
        ...state,
        torrentMagnet: action.payload
      };
    case START_SEARCH_TORRENT:
      return {
        ...state,
        torrentLoad: true
      };
    case DONE_SEARCH_TORRENT:
      return {
        ...state,
        torrentLoad: false
      };
    case CLEAN_SEARCH_TORRENT:
      return {
        ...state,
        torrentSearch: []
      };
    case SAVE_SEARCH_QUERY_TORRENT:
      return {
        ...state,
        torrentQuerySearch: action.payload
      }  
    default:
      return state;
  }
}
