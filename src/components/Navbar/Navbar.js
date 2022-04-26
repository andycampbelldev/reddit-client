import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavbarText } from 'reactstrap'
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
            <NavbarToggler onClick={function noRefCheck() { }} />
        </Navbar>
    )
}