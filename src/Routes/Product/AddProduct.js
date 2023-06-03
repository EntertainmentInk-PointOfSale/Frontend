import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import App from '../../App'
import { Card, Container, Col, Row } from "react-bootstrap";
import {useState, useEffect} from 'react'
import axios from 'axios';

export default function AddProduct(props) {
    const [taxOptions, setTaxOptions] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [categorys, setCategories] = useState([]) 
 
    useEffect(() => {
        // Get all tax codes
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "tax/",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            console.log("Tax Options: ",response.data)
            setTaxOptions(response.data);
        })
        .catch((err) => {
            console.log("Received error")
            console.log(err)
        })

        // Get all Product Categories
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "stockcategory/",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            console.log("Categories: ", response.data)
            setCategories(response.data)
        })
        .catch((err) => {
            console.log("Received error")
            console.log(err)
        })

        //Get all Suppliers
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "supplier/",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            console.log("Suppliers: ", response.data)
            setSuppliers(response.data)
        })
        .catch((err) => {
            console.log("Received error")
            console.log(err)
        })
    },[])

    return (
        
        <App title="New Product">
            <Container fluid>
                <Form>
                    <Row>
                        <Col md={3}>
                            <Card>
                                <Card.Header as="h5">New Product</Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                        <tbody>
                                            <tr>
                                                <td>Display Name:</td>
                                                <td>
                                                    <Form.Control
                                                        name="name_box"
                                                        size="sm"
                                                        type="text"
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Code:</td>
                                                <td>
                                                    <Form.Control
                                                        name="code_box"
                                                        size="sm"
                                                        type="text"
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Selling Price:</td>
                                                <td>
                                                    <Form.Control
                                                        name="sell_price_box"
                                                        size="sm"
                                                        type="text"
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Purchase Prie:</td>
                                                <td>
                                                    <Form.Control
                                                        name="purchase_price_box"
                                                        size="sm"
                                                        type="text"
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Stock Level:</td>
                                                <td>
                                                    <Form.Control
                                                        name="stock_level_box"
                                                        size="sm"
                                                        type="text"
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Supplier:</td>
                                                <td>
                                                    <Form.Control
                                                        name="choose_supplier"
                                                        as="select"
                                                        size="sm">
                                                        {suppliers.map((supplier, index) => <option>{supplier.name}</option>)}
                                                    </Form.Control>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Tax:</td>
                                                <td>
                                                    <Form.Control
                                                        name="choose_tax"
                                                        as="select"
                                                        size="sm">
                                                        {taxOptions.map((tax, index) => <option>{tax.tax_name}</option>)}
                                                    </Form.Control>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Category:</td>
                                                <td>
                                                    <Form.Control
                                                        name="choose_category"
                                                        as="select"
                                                        size="sm">
                                                        {categorys.map((category, index) => <option>{category.stock_name}</option>)}
                                                    </Form.Control>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={2}>
                            <Card>
                                <Card.Header as="h5">Supplier</Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <tbody>

                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={2}>
                            <Card>
                                <Card.Header as="h5">Tax</Card.Header>
                                <Card.Body>
                                    <Table responsive>
                                        <tbody>
                                            
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={2}>
                            <Card>
                                <Card.Header as="h5">Stock Category</Card.Header>
                                <Card.Body>
                                    <Table responsive >
                                        
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </App>
    )
}