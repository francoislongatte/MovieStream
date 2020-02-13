import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import movieDb from './movieDb';
import torrent from './torrent';

const reducers = (history) => combineReducers({
  movieDb,
  torrent,
  router: connectRouter(history)
})

export default reducers;