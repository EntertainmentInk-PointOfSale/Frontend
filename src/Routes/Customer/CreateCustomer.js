import {React, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'
import App from '../../App';
import axios from 'axios';


export default function CreateCustomer() {
    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")
    const [customerNote, setCustomerNote] = useState("")

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "customer/create",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'POST',
                data: {
                    "name": customerName,
                    "phone": customerPhone,
                    "email": customerEmail,
                    "note": customerNote,
                    "tax_exempt": false,
                }
            }
        )
        .then((response) => {
            navigate(`/customer/id/${response.data}`)
        })
    }

    return (
        <App title="Create Customer">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={e => setCustomerName(e.target.value)} 
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        onChange={e => setCustomerPhone(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        onChange={e => setCustomerEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formNote">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3}
                        onChange={e => setCustomerNote(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Create</Button>
            </Form>
        </App>
    )
}