import {React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import App from '../../App';

// React bootstrap
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import Button  from 'react-bootstrap/Button';
import { Container, Row, Col} from 'react-bootstrap';

// Cards
import {DisplayPersonalDetail, EditPersonalDetail} from './util/PersonalDetails'
import {DisplayNotes, EditNotes} from './util/Notes'
import {DisplayTaxStatus, EditTaxStatus} from './util/TaxStatus'

export default function DisplayCustomer(props) {
    //Customer data
    const {id} = useParams();
    const [customer, setCustomer] = useState(0);  
    
    //Edit States
    const [editPersonal, setEditPersonal] = useState(false);
    const handleSwitchPersonal = () => {setEditPersonal(!editPersonal);}
    const[editNote, setEditNote] = useState(false);
    const handleSwitchNote = () => {setEditNote(!editNote)}
    const[editTax, setEditTax] = useState(false);
    const handleSwitchTax = () => {setEditTax(!editTax)}

    useEffect(() => {
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: `customer/id/${id}`,
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            console.log(response.data)
            setCustomer(response.data);
        })
        .catch((err) => {
            console.log("ERROR: ",err)
        })
    }, [id]);

    return (
        <App title={`Customer ${id}`} className='customer-cards'>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col md={3}>
                        <Card>
                            <Card.Header as="h5">Customer Details</Card.Header>
                            <Card.Body>
                                {editPersonal ?
                                    <EditPersonalDetail 
                                        customer={customer} 
                                        handlePersonalClick={handleSwitchPersonal}
                                        setCustomer={setCustomer}
                                    /> 
                                    : 
                                    <DisplayPersonalDetail 
                                        customer={customer}
                                        handlePersonalClick={handleSwitchPersonal} 
                                    />
                                }  
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={5}>
                        <Card >
                            <Card.Header as="h5">Notes</Card.Header>
                            <Card.Body>
                                {editNote ? 
                                    <EditNotes 
                                        customer={customer} 
                                        setCustomer = {setCustomer}
                                        handleClickNote={handleSwitchNote}/>
                                :
                                    <DisplayNotes customer={customer} handleClickNote={handleSwitchNote}/>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Card >
                            <Card.Header as="h5">Transactions</Card.Header>
                            <Card.Body>
                                <DisplayTransactions customer={customer}/>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Card>
                            <Card.Header as="h5">Tax Status</Card.Header>
                            <Card.Body>
                                {editTax ?
                                    <EditTaxStatus
                                        customer={customer}
                                        setCustomer={setCustomer}
                                        handleClickTax={handleSwitchTax}/>
                                    :
                                    <DisplayTaxStatus 
                                        customer={customer}
                                        handleClickTax={handleSwitchTax}/>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </App>
    );
}

function DisplayTransactions(props) {
    return(
        <>
            <Table size="sm" responsive>
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
                <Button type="button" variant="outline-primary">Transactions</Button>
            </div>
        </>
    );
}
