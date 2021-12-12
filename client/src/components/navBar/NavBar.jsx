import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import StoneAgeImg from '../../assets/images/stoneage.png';
import WalletButton from '../walletButton/WalletButton';

const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Brand href="/">
                    <img alt="" src={StoneAgeImg} height="30" className="d-inline-block align-top" />
                </Navbar.Brand>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/builder">Builder</Nav.Link>
                        <Nav.Link href="/world">World</Nav.Link>
                        <Nav.Link href="/marketplace">Market</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <div className="d-flex">
                    <WalletButton dark />
                </div>
            </Container>
        </Navbar>
    );
};

export default NavBar;
