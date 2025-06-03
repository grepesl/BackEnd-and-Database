import React from 'react';
import './main.css';
import logo from '../assets/books-logo.jpg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to='/'><img src={logo} alt="logo" /></NavLink>
            <ul>
                <NavLink to="/" className="nav-link">
                    <p>HOME</p>
                </NavLink>
                <NavLink to="/all-books" className="nav-link">
                    <p>ALL BOOKS</p>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navbar;
