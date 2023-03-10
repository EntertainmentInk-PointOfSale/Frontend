import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect } from 'react'
import {Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'

function App(props) {
    useEffect(() => {
        document.title = props.title;
    },[props.title])
    
    return (
        <Fragment>
            <main style={{margin: 0, paddingLeft: 20, paddingRight: 20}}>
                <Header/>
                {props.children}
            </main>
        </Fragment>
    );
}

function Header() {
return (
    <Navbar>
        <Container fluid>
            <Navbar.Brand href="/">POS</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Transactions" id="TransactionDropDown">
                    <NavDropdown.Item>Holder</NavDropdown.Item>
                    <NavDropdown.Item>Holder</NavDropdown.Item>
                    <NavDropdown.Item>Holder</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Customers" id="CustomerDropDown">
                    <NavDropdown.Item href="/customer">Search</NavDropdown.Item>
                    <NavDropdown.Item>Create</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
    </Navbar>
);
}


export default App;
