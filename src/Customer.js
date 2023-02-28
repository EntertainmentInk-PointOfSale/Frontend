import {useState,useEffect,React} from 'react';
import axios from 'axios';
import Moment from 'react-moment';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Container, Row, Col} from 'react-bootstrap';

import './Customer.css';


function CustomerCard(props) {

    const [customer, setCustomer] = useState(0);
    
    const [editPersonal, setEditPersonal] = useState(false);
    const handleSwitchPersonal = () => {setEditPersonal(!editPersonal);}

    const[editNote, setEditNote] = useState(false);
    const handleSwitchNote = () => {setEditNote(!editNote)}

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
                            <DisplayTaxStatus customer={customer}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        
    );
}

function DisplayPersonalDetail(props) {  
    return (
        <>
            <Table responsive>
                <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>{props.customer.Name}</td>
                    </tr>
                    <tr>
                        <td>ID:</td>
                        <td>{props.customer.ID}</td>
                    </tr>
                    <tr>
                        <td>E-Mail:</td>
                        <td>{props.customer.Email}</td>
                    </tr>
                    <tr>
                        <td>Phone:</td>
                        <td>{props.customer.Phone}</td>
                    </tr>
                    <tr>
                        <td>Join Date:</td>
                        <td>
                            <Moment date={props.customer.Join_Date}  format="YYYY-MM-DD"></Moment>
                        </td>
                    </tr>
                    <tr>
                        <td>Status:</td>
                        <td>{props.customer.Active ? "Active" : "Not Active"}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="d-grid gap-2">
                <Button type="button" variant="outline-primary" size="lg" onClick={() => props.handlePersonalClick()}>Edit Details</Button>
            </div> 
        </>
    ) 
}

function EditPersonalDetail(props) {

    const [Name,setName]     = useState(props.customer.Name);
    const [Email,setEmail]   = useState(props.customer.Email);
    const [Phone,setPhone]   = useState(props.customer.Phone);
    const [Active,setActive] = useState(props.customer.Active); 

    useEffect(() => {
        setName(props.customer.Name);
        setEmail(props.customer.Email);
        setPhone(props.customer.Phone);
        setActive(props.customer.Active);
    },[props.customer])

    const handleSubmit = (event) => {
        event.preventDefault()
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "customer/update_personal/2",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'put',
                data: {
                    "Name":   Name,
                    "Email":  Email,
                    "Phone":  Phone,
                    "Active": Active
                }
            }
        )
        .then((response) => {
            console.log(response.data);
            props.setCustomer(response.data);
            props.handlePersonalClick()
        })
        .catch((err) => {
            console.log("ERROR")
        })
    }

    const cancelChange = () => {
        setName(props.customer.Name);
        setEmail(props.customer.Email);
        setPhone(props.customer.Phone);
        setActive(props.customer.Active);
        props.handlePersonalClick()
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Table responsive>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <Form.Control 
                                    name="name_box"
                                    size="sm" 
                                    type="text" 
                                    defaultValue={props.customer.Name}
                                    onChange={(e) => {setName(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>ID:</td>
                            <td>{props.customer.ID}</td>
                        </tr>
                        <tr>
                            <td>E-Mail:</td>
                            <td>
                                <Form.Control 
                                    name="email_box"
                                    size="sm" 
                                    type="text" 
                                    defaultValue={props.customer.Email}
                                    onChange={(e) => {setEmail(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td>
                                <Form.Control 
                                    name="phone_box"
                                    size="sm" 
                                    type="text" 
                                    defaultValue={props.customer.Phone}
                                    onChange={(e) => {setPhone(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr>
                        <td>Join Date:</td>
                        <td>
                            <Moment date={props.customer.Join_Date}  format="YYYY-MM-DD"></Moment>
                        </td>
                    </tr>
                        <tr>
                            <td>Status:</td>
                            <td>
                                <Form.Check
                                    name="active_switch"
                                    type="switch"
                                    id="active-switch"
                                    defaultChecked={props.customer.Active}
                                    onChange={(e) => {
                                        setActive(!Active)
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className="d-grid gap-2">
                    <Button type="button" size="lg" variant="outline-danger" onClick={() => cancelChange()}>Exit</Button>
                    <Button type="submit" size="lg" variant= "outline-primary">Save</Button>
                </div>   
            </Form>
        </>
    ) 
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

function DisplayTaxStatus(props) {
    return(
        <>
            <Table size="sm" responsive>
                <tbody>
                    <tr>
                        <td>Tax Exempt:</td>
                        <td>{props.customer.Tax_Exempt ? "Exempt" : "Not Exempt"}</td>
                    </tr>
                    <tr>
                        <td>Status ID</td>
                        <td>{props.customer.Tax_Exempt_Number == null ? "N/A" : props.customer.Tax_Exempt_Number}</td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="col text-center">
                <Button type="button" variant="outline-primary">Edit Status</Button>
            </div>
        </>
    )
}

function DisplayNotes(props) {
    return (
        <>
            <p className="big-text">
                {props.customer.Note}
            </p>
            <div className="col text-center">
                <Button type="button" variant="outline-primary" onClick={() => props.handleClickNote()}>Edit Notes</Button>
            </div>
        </>
    )
}

function EditNotes(props) {
    const [Note,setNote] = useState(props.customer.Note);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Customer Note",props.customer.Note);
        console.log("New NOTE",Note);
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "customer/update_personal/2",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'put',
                data: {
                    "Note":Note
                }
            }
        )
        .then((response) => {
            console.log("Response.data", response.data)
            props.setCustomer(response.data);
            props.handleClickNote()
        })
        .catch((err) => {
            console.log("Error: ",err)
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Table borderless responsive>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <Form.Control
                                as="textarea"
                                className="width:100%"
                                rows="5"
                                cols="50"
                                name="enter_note"
                                defaultValue={props.customer.Note}
                                onChange={(e) => setNote(e.target.value)}
                            />
                        </td>
                    </tr> 
                    <tr>
                        <td>
                            <div className="d-grid gap-2">
                            <Button type="button" variant="outline-danger" size="lg" onClick={() => props.handleClickNote()}>Quit</Button>
                            </div>
                        </td>
                        <td>
                            <div className="d-grid gap-2">
                            <Button type="submit" variant="outline-primary" size="lg">Save</Button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Form>
    )
}


export default CustomerCard