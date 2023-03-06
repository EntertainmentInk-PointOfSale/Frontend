import {useState,useEffect,React} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment';
import App from '../../App';
import Button  from 'react-bootstrap/Button';
import { Container, Row } from 'react-bootstrap';

export default function SearchCustomer() {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "customer/",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            setSearchResults(response.data);
        })
    },[])

    return (
        <App title="Customers">
            <Container>
                <Row>
                    
                </Row>
                <Row>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Join Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchResults.map(customer =>
                                    (
                                        <tr>
                                            <td>{customer.ID}</td>
                                            <td>{customer.Name}</td>
                                            <td>{customer.Phone}</td>
                                            <td>{customer.Email}</td>
                                            <td><Moment date={customer.Join_Date}  format="YYYY-MM-DD"></Moment></td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
            
        </App>
    )

}