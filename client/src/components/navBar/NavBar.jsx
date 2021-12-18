import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import StoneAgeImg from '../../assets/images/stoneage.png';
import WalletButton from '../walletButton/WalletButton';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
    return (
        <Navbar bg="dark" variant="dark" expand="sm" fixed={props.fixed}>
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <NavLink className="navbar-brand" to="/">
                    <img alt="StoneAge" src={StoneAgeImg} height="30" className="d-inline-block align-top" />
                </NavLink>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <NavDropdown title="World" id="navbarScrollingDropdown" menuVariant="dark">
                            <NavLink className="dropdown-item" to="/world?controls=orbit">
                                Orbit
                            </NavLink>
                            {/* <NavDropdown.Divider /> */}
                            <NavLink className="dropdown-item" to="/world?controls=move">
                                Move
                            </NavLink>
                            <NavLink className="dropdown-item" to="/world?controls=fly">
                                Fly
                            </NavLink>
                        </NavDropdown>
                        <NavLink className="nav-link" to="/builder">
                            Builder
                        </NavLink>
                        <NavLink className="nav-link" to="/marketplace">
                            Market
                        </NavLink>
                        <NavLink className="nav-link" to="/mint">
                            Mint
                        </NavLink>
                    </Nav>
                    <div>
                        <WalletButton dark />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
