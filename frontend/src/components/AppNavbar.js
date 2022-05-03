import React from 'react';
import {Navbar, NavbarBrand, NavLink, Nav, NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';

const AppNavbar = () => {
    return <Navbar color='dark' dark expand='lg'>
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <Nav className='ml-auto' navbar>
                <NavItem>
                    <NavLink tag={Link} to='/races'>Races</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to='/horses'>Horses</NavLink>
                </NavItem>
            </Nav>
    </Navbar>;
}

export default AppNavbar