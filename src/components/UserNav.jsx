import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function UserNav() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary shadow">
            <Container>
                <Navbar.Brand href="/"><i className="fa-solid fa-rocket fa-xl"></i>labourJet</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                    </Nav>
                    <Nav>
                    <Nav.Link  className='border border-2 rounded-pill' >
                            <i className="fa-solid fa-user fa-xl mx-1"></i>
                        </Nav.Link>
                        <Nav.Link  className='me-3' >
                            Logout
                        </Nav.Link>
                       

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default UserNav
