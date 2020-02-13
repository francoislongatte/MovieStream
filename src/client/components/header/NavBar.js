import './NavBar.scss';
import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import { push } from 'connected-react-router';

const NavBar = () => {
    const route = useSelector(state => state.router.location.pathname)
    const dispatch = useDispatch();
    return (
        <nav className="pure-menu-list">
            <li className={(route === '/' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item')}><a className="pure-menu-link" onClick={() => dispatch(push('/'))}>Home</a></li>
            <li className={(route === '/movies' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item')}><a className="pure-menu-link" onClick={() => dispatch(push('/movies'))}>Movies</a></li>
            <li className={(route === '/torrent' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item')}><a className="pure-menu-link" onClick={() => dispatch(push('/series'))}>Series</a></li>
            <li className={(route === '/torrent' ? 'pure-menu-item pure-menu-selected' : 'pure-menu-item')}><a className="pure-menu-link" onClick={() => dispatch(push('/torrent'))}>View torrents</a></li>
        </nav>
    )
}


export default NavBar;