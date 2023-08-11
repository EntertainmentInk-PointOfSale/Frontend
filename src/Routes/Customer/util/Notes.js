import {useState,React} from 'react';
import axios from 'axios';

import Table from 'react-bootstrap/Table'
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

export function DisplayNotes(props) {
    return (
        <>
            <p className="big-text">
                {props.customer.note}
            </p>
            {!props.customer.isStoreUser && 
                <div className="col text-center">
                    <Button type="button" variant="outline-primary" onClick={() => props.handleClickNote()}>Edit Notes</Button>
                </div>
            }
        </>
    )
}

export function EditNotes(props) {
    const [note,setNote] = useState(props.customer.note);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: `customer/update_personal/${props.customer.id}`,
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'put',
                data: {
                    "note": note
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
                                defaultValue={props.customer.note}
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