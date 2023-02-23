import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import {
  Container,
  Navbar,
  Nav
} from 'react-bootstrap'
import CustomerCard from './Customer';

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
          <Nav.Link href="#transactions">Transactions</Nav.Link>
          <Nav.Link href="#customers">Customers</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default App;
