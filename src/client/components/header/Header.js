import React from 'react';
import './Header.scss';
import logo from '../../asset/images/logo.png';
import { useDispatch } from "react-redux";
import { push } from 'connected-react-router';
import NavBar from './NavBar';

const Header = () => {
    const dispatch = useDispatch();
    return (
        <header className="header ">
            <div className="home-menu pure-menu pure-menu-horizontal pure-g">
                <div className="pure-u-2-24">
                    <div className="pure-menu">
                        <a className="pure-menu-heading" onClick={() => dispatch(push('/'))}>
                            <img src={logo} className="imgCenter"/>
                        </a>
                    </div>
                </div>
                <div className="pure-u-12-24">
                    <NavBar />
                </div>
               
                <div className="pure-u-10-24">
                    <ul className="pure-menu-list float-right">
                        <li className="pure-menu-item">
                            <span>Welcome!</span>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header