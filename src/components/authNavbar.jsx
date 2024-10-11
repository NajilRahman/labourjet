import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
function AuthNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary shadow">
    <Container>
        <Navbar.Brand href="/"><i className="fa-solid fa-rocket fa-xl"></i>labourJet</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                

            </Nav>
            <Nav>
                <NavDropdown title="Register" id="collapsible-nav-dropdown">


                    <NavDropdown.Item >
                        <Link to={'/UserRegister'} style={{ textDecoration: 'none' }}>User</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item >
                        <Link to={'/EmployeeRegister'} style={{ textDecoration: 'none' }}>Employee</Link>
                    </NavDropdown.Item>              </NavDropdown>
                <Nav.Link  >
                    <Link to={'/Login'} style={{ textDecoration: 'none' }}>Login</Link>
                </Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
  )
}

export default AuthNavbar
