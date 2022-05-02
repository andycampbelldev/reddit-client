import React from "react";
import { Navbar, NavbarBrand } from 'reactstrap'
import SearchForm from "../../features/searchForm/searchForm";

export default () => {
    return (
        <Navbar
            color="light"
            expand="md"
            light
        >
            <NavbarBrand href="/">
                Reddit-Client
            </NavbarBrand>
            <SearchForm />  
        </Navbar>
    )
}