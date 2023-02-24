import {useState,useEffect,React} from 'react';
import axios from 'axios';
import Moment from 'react-moment';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import Button  from 'react-bootstrap/Button';
import { Container, Row, Col, Modal } from 'react-bootstrap';

import './Customer.css';


function CustomerCard(props) {

    const [customer, setCustomer] = useState(0);

    const [showEditPersonal, setShowEditPersonal] = useState(false);

    const handleCloseEditPersonal = () => setShowEditPersonal(false);
    const handleOpenEditPersonal  = () => setShowEditPersonal(true);

    useEffect(() => {
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "customer/id/2",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            setCustomer(response.data);
        })
    }, []);

    return (
        <Container style={{display:'flex'}}>
            <Row className="justify-content-center">
                <Col>
                    <Card>
                        <Card.Header as="h5">Customer Details</Card.Header>
                        <Card.Body>
                            <Table size="sm">
                                <tbody>
                                    <tr>
                                        <td>Name:</td>
                                        <td>{customer.Name}</td>
                                    </tr>
                                    <tr>
                                        <td>ID:</td>
                                        <td>{customer.ID}</td>
                                    </tr>
                                    <tr>
                                        <td>E-Mail:</td>
                                        <td>{customer.Email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone:</td>
                                        <td>{customer.Phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Join Date:</td>
                                        <td>
                                            <Moment date={customer.Join_Date}  format="YYYY-MM-DD"></Moment>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Status:</td>
                                        <td>{customer.Active ? "Active" : "Not Active"}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <div className="col text-center" onClick={handleOpenEditPersonal}>
                                <Button variant="outline-primary">Edit Details</Button>
                            </div> 

                            <Modal show={showEditPersonal} onHide = {handleCloseEditPersonal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Personal Details</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <Table size="sm">
                                        <tbody>
                                            <tr>
                                                <td>Name:</td>
                                                <td>{customer.Name}</td>
                                            </tr>
                                            <tr>
                                                <td>ID:</td>
                                                <td>{customer.ID}</td>
                                            </tr>
                                            <tr>
                                                <td>E-Mail:</td>
                                                <td>{customer.Email}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone:</td>
                                                <td>{customer.Phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Status:</td>
                                                <td>{customer.Active ? "Active" : "Not Active"}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseEditPersonal}>
                                        Close
                                    </Button>

                                    <Button variant="primary" onClick={handleCloseEditPersonal}>
                                        Save
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card >
                        <Card.Header as="h5">Transactions</Card.Header>
                        <Card.Body>
                            <Table size="sm">
                                <tbody>
                                    <tr>
                                        <td>Last Purchase</td>
                                        <td>Filer Value</td>
                                    </tr>
                                    <tr>
                                        <td>Total Spent</td>
                                        <td>Filer Value</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="col text-center">
                                <Button variant="outline-primary">Transactions</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card >
                        <Card.Header as="h5">Tax Status</Card.Header>
                        <Card.Body>
                            <Table size="sm">
                                <tbody>
                                    <tr>
                                        <td>Tax Exempt:</td>
                                        <td>{customer.Tax_Exempt ? "Exempt" : "Not Exempt"}</td>
                                    </tr>
                                    <tr>
                                        <td>Status ID</td>
                                        <td>{customer.Tax_Exempt_Number == null ? "N/A" : customer.Tax_Exempt_Number}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="col text-center">
                                <Button variant="outline-primary">Edit Status</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        
    );
}


export default CustomerCard