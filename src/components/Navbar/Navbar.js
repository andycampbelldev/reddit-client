import React from 'react';

import { Navbar, NavbarBrand } from 'reactstrap'
import SearchForm from '../../features/SearchForm/SearchForm';
import ThemeSwitch from '../../features/Theme/ThemeSwitch';

import './Navbar.css';

export default () => {
    return (
        <Navbar
            className='Navbar'
            expand='md'
        >
            <NavbarBrand className='NavbarBrand' href='/'>
                <span className='d-none d-md-block'>RedditBoard</span>
                <span className='d-block d-md-none'>RB</span>
            </NavbarBrand>
            <SearchForm />
            <ThemeSwitch />  
        </Navbar>
    )
}