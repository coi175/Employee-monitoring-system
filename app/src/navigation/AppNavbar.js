import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <Nav className="justify-content-start" style={{width: "100%"}} navbar>
                <NavItem>
                    <NavLink href="/employees">Employees</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/posts">Posts</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/statistic">Statistic</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default AppNavbar;