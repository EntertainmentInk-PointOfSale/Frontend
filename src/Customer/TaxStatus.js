import {useState,React} from 'react';
import axios from 'axios';

import Table  from 'react-bootstrap/Table'
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import './Customer.css';

export function DisplayTaxStatus(props) {
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
                        <td>
                            {
                                !props.customer.Tax_Exempt ? 
                                    "N/A" : 
                                    (props.customer.Tax_Exempt_Number ? 
                                            props.customer.Tax_Exempt_Number : 
                                            "")
                            }
                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="col text-center">
                <Button type="button" variant="outline-primary" onClick={() => props.handleClickTax()}>Edit Status</Button>
            </div>
        </>
    )
}

export function EditTaxStatus(props) {
    const [exemptStatus,setExemptStatus] = useState(props.customer.Tax_Exempt);
    const [exemptNumber,setExemptNumber] = useState(props.customer.Tax_Exempt_Number);

    const handleSubmit = (event) => {
        event.preventDefault();
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
                    "Tax_Exempt":exemptStatus,
                    "Tax_Exempt_Number":exemptNumber
                }
            }
        )
        .then((response) => {
            props.setCustomer(response.data);
            props.handleClickTax()
        })
        .catch((err) => {
            console.log("Error: ",err)
        })
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Table size="sm" responsive>
                <tbody>
                        <tr>
                            <td>Tax Exempt:</td>
                            <td>
                                <Form.Check
                                    name="exempt_switch"
                                    type="switch"
                                    id="exempt-switch"
                                    defaultChecked={props.customer.Tax_Exempt}
                                    onChange={() => {
                                        setExemptStatus(!exemptStatus)
                                    }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Status ID</td>
                            <td>
                            <Form.Control 
                                    name="exempt_number_box"
                                    size="sm" 
                                    type="text" 
                                    defaultValue={props.customer.Tax_Exempt_Number}
                                    onChange={(e) => {setExemptNumber(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr>
                            <td>

                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className="d-grid gap-2">
                    <Button type="button" variant="outline-danger" onClick={() => props.handleClickTax()}>Quit</Button>
                    <Button type="submit" variant="outline-primary">Save</Button>
                </div>
            </Form>    
        </>
    )
}