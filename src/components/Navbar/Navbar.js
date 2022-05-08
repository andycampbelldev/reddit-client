import React from "react";
import { Navbar, NavbarBrand } from 'reactstrap'
import SearchForm from "../../features/searchForm/SearchForm";

export default () => {
    return (
        <Navbar
            color="light"
            expand="md"
            light
        >
            <NavbarBrand href="/">
                Reddit-Board
            </NavbarBrand>
            <SearchForm />  
        </Navbar>
    )
}