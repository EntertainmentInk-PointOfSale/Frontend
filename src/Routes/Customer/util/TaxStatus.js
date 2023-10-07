import {useState,React} from 'react';
import axios from 'axios';

import Table  from 'react-bootstrap/Table'
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import styles from './style.module.scss';

export function DisplayTaxStatus(props) {
    return(
        <>
            <Table size="sm" responsive>
                <tbody>
                    <tr>
                        <td className={styles.header_text}>Tax Exempt:</td>
                        <td className={styles.value_text}>{props.customer.tax_exempt ? "Exempt" : "Not Exempt"}</td>
                    </tr>
                    <tr>
                        <td className={styles.header_text}>Status ID</td>
                        <td className={styles.value_text}>
                            {
                                !props.customer.tax_exempt ? 
                                    "N/A" : 
                                    (props.customer.tax_exempt_number ? 
                                            props.customer.tax_exempt_number : 
                                            "")
                            }
                        </td>
                    </tr>
                </tbody>
            </Table>
            {!props.customer.isStoreUser && 
                <div className="col text-center">
                    <Button type="button" variant="outline-primary" onClick={() => props.handleClickTax()}>Edit Status</Button>
                </div>
            }
            
        </>
    )
}

export function EditTaxStatus(props) {
    const [exemptStatus,setExemptStatus] = useState(props.customer.tax_exempt);
    const [exemptNumber,setExemptNumber] = useState(props.customer.tax_exempt_number);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios(
            {
                baseURL: "http://server:3001/api",
                url: `customer/update_personal/${props.customer.id}`,
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'put',
                data: {
                    "tax_exempt":exemptStatus,
                    "tax_exempt_number":exemptNumber
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
                            <td className={styles.header_text}>Tax Exempt:</td>
                            <td className={styles.value_text}>
                                <Form.Check
                                    name="exempt_switch"
                                    type="switch"
                                    id="exempt-switch"
                                    defaultChecked={props.customer.tax_exempt}
                                    onChange={() => {
                                        setExemptStatus(!exemptStatus)
                                    }}/>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.header_text}>Status ID</td>
                            <td className={styles.value_text}>
                            <Form.Control 
                                    name="exempt_number_box"
                                    size="sm" 
                                    type="text" 
                                    defaultValue={props.customer.tax_exempt_number}
                                    onChange={(e) => {setExemptNumber(e.target.value)}}/>
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