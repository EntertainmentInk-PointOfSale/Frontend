import {useState,useEffect,React} from 'react';
import axios from 'axios';
import Moment from 'react-moment';

import Table from 'react-bootstrap/Table'
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import styles from './style.module.scss';

export function DisplayPersonalDetail(props) {  
    return (
        <>
            <Table responsive>
                <tbody>
                    <tr>
                        <td className={styles.header_text}>Name:</td>
                        <td className={styles.value_text}>{props.customer.name}</td>
                    </tr>
                    <tr>
                        <td className={styles.header_text}>ID:</td>
                        <td className={styles.value_text}>{props.customer.id}</td>
                    </tr>
                    <tr>
                        <td className={styles.header_text}>E-Mail:</td>
                        <td className={styles.value_text}>{props.customer.email}</td>
                    </tr>
                    <tr>
                        <td className={styles.header_text}>Phone:</td>
                        <td className={styles.value_text}>{props.customer.phone}</td>
                    </tr>
                    <tr>
                        <td className={styles.header_text}>Join Date:</td>
                        <td className={styles.value_text}>
                            <Moment date={props.customer.join_date}  format="YYYY-MM-DD"></Moment>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.header_text}>Status:</td>
                        <td className={styles.value_text}>{props.customer.active ? "Active" : "Not Active"}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="d-grid gap-2">
                <Button type="button" variant="outline-primary" size="lg" onClick={() => props.handlePersonalClick()}>Edit Details</Button>
            </div> 
        </>
    ) 
}

export function EditPersonalDetail(props) {

    const [name,setName]     = useState(props.customer.name);
    const [email,setEmail]   = useState(props.customer.email);
    const [phone,setPhone]   = useState(props.customer.phone);
    const [active,setActive] = useState(props.customer.active); 

    useEffect(() => {
        setName(props.customer.name);
        setEmail(props.customer.email);
        setPhone(props.customer.phone);
        setActive(props.customer.active);
    },[props.customer])

    const handleSubmit = (event) => {
        event.preventDefault()
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: `customer/update_personal/${props.customer.ID}`,
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'put',
                data: {
                    "name":   name,
                    "email":  email,
                    "phone":  phone,
                    "active": active
                }
            }
        )
        .then((response) => {
            props.setCustomer(response.data);
            props.handlePersonalClick()
        })
        .catch((err) => {
            console.log("ERROR")
        })
    }

    const cancelChange = () => {
        setName(props.customer.name);
        setEmail(props.customer.email);
        setPhone(props.customer.phone);
        setActive(props.customer.active);
        props.handlePersonalClick()
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Table responsive>
                    <tbody>
                        <tr>
                            <td className={styles.header_text}>Name:</td>
                            <td className={styles.value_text}>
                                <Form.Control 
                                    name="name_box"
                                    size="sm" 
                                    type="text" 
                                    defaultValue={props.customer.name}
                                    onChange={(e) => {setName(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.header_text}>ID:</td>
                            <td className={styles.value_text}>{props.customer.id}</td>
                        </tr>
                        <tr>
                            <td className={styles.header_text}>E-Mail:</td>
                            <td className={styles.value_text}>
                                <Form.Control 
                                    name="email_box"
                                    size="sm" 
                                    type="text" 
                                    defaultValue={props.customer.email}
                                    onChange={(e) => {setEmail(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.header_text}>Phone:</td>
                            <td className={styles.value_text}>
                                <Form.Control 
                                    name="phone_box"
                                    size="sm" 
                                    type="text" 
                                    defaultValue={props.customer.phone}
                                    onChange={(e) => {setPhone(e.target.value)}}/>
                            </td>
                        </tr>
                        <tr>
                        <td className={styles.header_text}>Join Date:</td>
                        <td className={styles.value_text}>
                            <Moment date={props.customer.join_date}  format="YYYY-MM-DD"></Moment>
                        </td>
                    </tr>
                        <tr>
                            <td className={styles.header_text}>Status:</td>
                            <td className={styles.value_text}>
                                <Form.Check
                                    name="active_switch"
                                    type="switch"
                                    id="active-switch"
                                    defaultChecked={props.customer.active}
                                    onChange={(e) => {
                                        setActive(!active)
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