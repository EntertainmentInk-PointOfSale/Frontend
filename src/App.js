import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import CustomerCard from './Customer/Customer';

function App() {
    return (
        <div>
            <Header/>
            <CustomerCard/>
        </div>
    );
}

function Header() {
return (
    <Navbar>
        <Container>
            <Navbar.Brand href="#home">POS</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="Transactions" id="TransactionDropDown">
                    <NavDropdown.Item>Holder</NavDropdown.Item>
                    <NavDropdown.Item>Holder</NavDropdown.Item>
                    <NavDropdown.Item>Holder</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Customers" id="CustomerDropDown">
                    <NavDropdown.Item>Search</NavDropdown.Item>
                    <NavDropdown.Item>Create</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Container>
    </Navbar>
);
}


export default App;
