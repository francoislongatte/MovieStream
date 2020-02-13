// import { torrentSearch } from 'torrent-search-api';
import React from 'react';
import ReactDOM from 'react-dom';
import 'purecss';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './redux/store/configureStore';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'

export const history = createBrowserHistory();
const store = configureStore(history);

ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>, 
        document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
