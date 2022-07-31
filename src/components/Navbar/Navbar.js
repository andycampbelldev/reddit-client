import React from 'react';

import { Navbar as ReactStrapNavbar, NavbarBrand } from 'reactstrap'
import SearchForm from '../../features/SearchForm/SearchForm';
import ThemeSwitch from '../../features/Theme/ThemeSwitch';

import './Navbar.css';

export default function Navbar(props) {
    return (
        <ReactStrapNavbar
            className='Navbar'
            expand='md'
        >
            <NavbarBrand className='NavbarBrand' href='/'>
                <span className='d-none d-md-block'>RedditBoard</span>
                <span className='d-block d-md-none'>RB</span>
            </NavbarBrand>
            <SearchForm />
            <ThemeSwitch />  
        </ReactStrapNavbar>
    )
}