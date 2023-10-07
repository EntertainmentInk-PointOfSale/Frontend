// Page 
import {useEffect, useState} from "react";
import axios from 'axios';

// Components
import App from "../../App"
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Table
} from 'react-bootstrap'

// Custom 
import TransactionTable from './TransactionTable';
import { SaleItem } from '../../Objects/SaleItem'
import CustomerModal from '../Customer/CustomerModal'
import Customer from "../../Objects/Customer";

const mock_item = {lookup_code: '123456789', product_name: 'Other Product Product ', selling_price: '11.99', tax_applied: {tax_code:2,tax_name:"HST","amount":0.13}}


export default function TransactionHome(props) {
    // Transaction states
    const [products, setProducts] = useState([]);
    const [customer, setCustomer] = useState(props.customer)

    const [subtotal, setSubtotal] = useState(0.00);
    const [taxTotal, setTaxTotal] = useState(0.00);
    const [total,    setTotal]    = useState(0.00);

    //  Search State
    const [searchQuery,  setSearchQuery]  = useState("");
    const [rowSelection, setRowSelection] = useState({});
    const [scrollTo,     setScrollTo]     = useState(0);

    // Customer Utils
    const [showCustomerModal, setShowCustomerModal] = useState(false); 

    //Utility
    const handleSearch = (event) => {
        event.preventDefault();

        if(searchQuery === "")
        {
            console.error("Cannot search for empty product")
            return
        }

        var url = `product/code/${searchQuery}`

        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: url,
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            const item = new SaleItem(response.data)
            setProducts([...products, item])
        })
        .finally(() => {
            setScrollTo(products.length-1)
        })
    }

    const removeSelected = () => {
        const keys = Object.keys(rowSelection).map((x) => parseInt(x)).reverse()

        if (keys === []) return;

        let tempProducts = [...products];

        for(var i = 0; i < keys.length; i++) {
            tempProducts.splice(keys[i],1);
        }

        setRowSelection([])
        setProducts(tempProducts);
    }

    // Update displayed price on products list change
    useEffect(() => {
        var sub_temp = 0.00;
        var tax_temp = 0.00;

        for(const item of products) {
            sub_temp += parseFloat(item.selling_price)
            tax_temp += parseFloat(item.selling_price) * parseFloat(item.tax_applied.amount)
        }

        sub_temp = Math.round(sub_temp * 100) / 100;
        tax_temp = Math.round(tax_temp * 100) / 100

        setSubtotal(sub_temp);
        setTaxTotal(tax_temp);
        setTotal(Math.round((sub_temp + tax_temp) * 100) / 100);
    }, [products])

    useEffect(() => {
        // Reset attributes
        setProducts([])

        // Load sample products
        for (var i = 0; i < 15; i++) {
            const item = new SaleItem(mock_item)
            setProducts(previousInputs => [...previousInputs, item])
        }

    }, [])

    return(
        <>
            <CustomerModal show={showCustomerModal} setShow={setShowCustomerModal} />

            <Form onSubmit={handleSearch}>
                <Container>
                        <Row className='mb-3'>
                            <Col>
                                <div className='transaction-table-container'>
                                    <TransactionTable data={products} rowSelection={rowSelection} setRowSelection={setRowSelection} scrollTo={scrollTo}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mb-4'>
                            <Col md="10">
                                <Form.Control 
                                type="text"
                                id="searchbar"
                                onChange={(e) => setSearchQuery(e.target.value)}/>
                            </Col>
                            <Col md="2">
                                <Button variant="primary" type="submit" style={{width: '100%'}}>
                                    Enter
                                </Button>
                            </Col>
                        </Row>
                        <Row className='mb-2' style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Col md="2">
                                <Card style={{minWidth: '200px'}}>
                                    <Card.Header><b>Totals</b></Card.Header>
                                    <Card.Body>
                                        <Table>
                                            <tbody>
                                                <tr>
                                                    <td>Subtotal:</td>
                                                    <td>${subtotal}</td>
                                                </tr>
                                                <tr>
                                                    <td>Tax Amount:</td>
                                                    <td>${taxTotal}</td>
                                                </tr>
                                                <tr>
                                                    <td>Total Due:</td>
                                                    <td>${total}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="2">
                                <Card style={{minWidth: '200px'}}>
                                    <Card.Header><b>Customer ({customer.name})</b></Card.Header>
                                    <Card.Body>
                                        <div className='transaction-button-container'>
                                            <div>
                                                <Button variant="secondary" style={{width: '100%'}} onClick={() => setShowCustomerModal(true)}>Select</Button>
                                            </div>
                                            <div>
                                                <Button variant="secondary" style={{width: '100%'}} onClick={() => console.log("View Sales")}>View Sales</Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="2" >
                                <Card style={{minWidth: '200px'}}>
                                    <Card.Header><b>Product</b></Card.Header>
                                    <Card.Body>
                                        <div className='transaction-button-container'>
                                            <div>
                                                <Button variant="secondary" style={{width: '100%'}} onClick={() => console.log("Search")}>Search Products</Button>
                                            </div>
                                            <div>
                                                <Button variant="secondary" style={{width: '100%'}} onClick={() => console.log("New")}>New Product</Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="2" >
                                <div className='transaction-button-container'>
                                    <div>
                                        <Button variant="secondary" style={{width: '100%'}} onClick={() => removeSelected()}>Remove Selected</Button>
                                    </div>
                                    <div>
                                        <Button variant="secondary" style={{width: '100%'}} onClick={() => console.log("Hold")}>Hold Transaction</Button>
                                    </div>
                                    <div>
                                        <Button variant="secondary" style={{width: '100%'}} onClick={() => console.log("Cancel")}>Cancel Transaction</Button>
                                    </div>
                                    <div>
                                        <Button variant="secondary" style={{width: '100%'}} onClick={() => console.log("Checkout")}>Checkout</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                </Container>
            </Form>
        </>
    )
}