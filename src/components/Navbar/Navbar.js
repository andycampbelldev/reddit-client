import React from "react";
import { Navbar, NavbarBrand, NavbarToggler, Nav, NavbarText } from 'reactstrap'

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
            <NavbarToggler onClick={function noRefCheck() { }} />
        </Navbar>
    )
}