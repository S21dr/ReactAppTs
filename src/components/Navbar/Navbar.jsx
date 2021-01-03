import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <ul>
                <li><NavLink to="/frends" activeClassName={s.activeLink}>Frends</NavLink></li>
                <li><NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink></li>
                <li><NavLink to="/messages" activeClassName={s.activeLink}>Messages</NavLink></li>
                <li><NavLink to="/news" activeClassName={s.activeLink}>News</NavLink></li>
                <li><NavLink to="music" activeClassName={s.activeLink}>Music</NavLink></li>
                <li><NavLink to="/setting" activeClassName={s.activeLink}>Setting</NavLink></li>
            </ul>
        </nav>
    )
};

export default Navbar;