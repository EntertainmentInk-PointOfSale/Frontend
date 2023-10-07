import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import {Button} from 'react-bootstrap'
import App from '../../App'
import { Card, Container, Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios';

export default function AddProduct(props) {
    // Select options
    const [taxOptions, setTaxOptions] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [categorys, setCategories] = useState([]) 
 
    // Selected option
    const [supplier, setSupplier] = useState(0)
    const [tax, setTax] = useState(0)
    const [category, setCategory] = useState(0)

    // Written attributes
    const [productName, setProductName] = useState("")
    const [lookupCode, setLookupCode] = useState("")
    const [sellPrice,setSellPrice] = useState("")
    const [purchasePrice, setPurchasePrice] = useState("")
    const [stockLevel, setStockLevel] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        // Get all tax codes
        axios(
            {
                baseURL: "http://server:3001/api",
                url: "tax/",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            setTaxOptions(response.data);
        })
        .catch((err) => {
            console.log("Received error")
            console.log(err)
        })

        // Get all Product Categories
        axios(
            {
                baseURL: "http://server:3001/api",
                url: "stockcategory/",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            setCategories(response.data)
        })
        .catch((err) => {
            console.log("Received error")
            console.log(err)
        })

        //Get all Suppliers
        axios(
            {
                baseURL: "http://server:3001/api",
                url: "supplier/",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            setSuppliers(response.data)
        })
        .catch((err) => {
            console.log("Received error")
            console.log(err)
        })
    },[])

    const handleSubmit = (event) => {
        event.preventDefault()

        axios(
            {
                baseURL: "http://server:3001/api",
                url: "product/create",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'POST',
                data: {
                    "product_name": productName,
                    "lookup_code": lookupCode,
                    "selling_price": sellPrice,
                    "purchase_price": purchasePrice,
                    "stock_level": stockLevel,
                    "supplier_id": suppliers[supplier].supplier_id,
                    "tax_id": taxOptions[tax].tax_code,
                    "category_id": categorys[category].stock_id
                }
            }
        )
        .then((response) => {
            navigate(`/product/${response.data}`)
        })
    }

    return (
        
        <App title="New Product">
            <Container fluid>
                <Form onSubmit={handleSubmit}>
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
                                                        required
                                                        name="name_box"
                                                        size="sm"
                                                        type="text"
                                                        onChange={(e) => {setProductName(e.target.value)}}
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Code:</td>
                                                <td>
                                                    <Form.Control
                                                        required
                                                        name="code_box"
                                                        size="sm"
                                                        type="text"
                                                        onChange={(e) => {setLookupCode(e.target.value)}}
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Selling Price:</td>
                                                <td>
                                                    <Form.Control
                                                        required
                                                        name="sell_price_box"
                                                        size="sm"
                                                        type="text"
                                                        onChange={(e) => {setSellPrice(e.target.value)}}
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Purchase Price:</td>
                                                <td>
                                                    <Form.Control
                                                        required
                                                        name="purchase_price_box"
                                                        size="sm"
                                                        type="text"
                                                        onChange={(e) => {setPurchasePrice(e.target.value)}}
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Stock Level:</td>
                                                <td>
                                                    <Form.Control
                                                        required
                                                        name="stock_level_box"
                                                        size="sm"
                                                        type="text"
                                                        onChange={(e) => {setStockLevel(e.target.value)}}
                                                        />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Supplier:</td>
                                                <td>
                                                    <Form.Control
                                                        name="choose_supplier"
                                                        as="select"
                                                        size="sm"
                                                        onChange={(e) => {setSupplier(e.target.selectedIndex)}}>
                                                        {suppliers.map((supplier, index) => <option key={index}>{supplier.name}</option>)}
                                                    </Form.Control>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Tax:</td>
                                                <td>
                                                    <Form.Control
                                                        name="choose_tax"
                                                        as="select"
                                                        size="sm"
                                                        onChange={(e) => {setTax(e.target.selectedIndex)}}>
                                                        {taxOptions.map((tax, index) => <option key={index}>{tax.tax_name}</option>)}
                                                    </Form.Control>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Category:</td>
                                                <td>
                                                    <Form.Control
                                                        name="choose_category"
                                                        as="select"
                                                        size="sm"
                                                        onChange={(e) => {setCategory(e.target.selectedIndex)}}>
                                                        {categorys.map((category, index) => <option key={index}>{category.stock_name}</option>)}
                                                    </Form.Control>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <Button type="submit">Submit</Button>
                                                </td>
                                            </tr>
                                        </tbody>
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