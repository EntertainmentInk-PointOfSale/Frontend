import './TransactionHome.css'

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
import { SaleItem } from '../../Data/SaleItem'

export default function TransactionHome(props) {

    const [searchQuery, setSearchQuery] = useState();
    const [products, setProducts] = useState([]);

    const [rowSelection, setRowSelection] = useState({});

    const [subtotal, setSubtotal] = useState(0.00);
    const [taxTotal, setTaxTotal] = useState(0.00);
    const [total,    setTotal]    = useState(0.00);


    //Search for product code and add to transaction if found
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

    }

    //Set sale price when products changes
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
        setTotal(Math.round(sub_temp + tax_temp * 100) / 100);
    }, [products])

    const removeSelected = () => {
        const tempProducts = products;

        for(const index in rowSelection) {
            tempProducts.splice(index,1);
        }

        setProducts(tempProducts);
    }

    return(
        <App title="Transaction">
            <Form onSubmit={handleSearch}>
                <Container>
                        <Row className='mb-2'>
                            <Col>
                                <div className='transaction-div'>
                                    <TransactionTable data={products} rowSelection={rowSelection} setRowSelection={setRowSelection}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
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
                                    <Card.Header><b>Customer</b></Card.Header>
                                    <Card.Body>
                                        <div style={{display: 'flex', justifyContent: 'right', flexDirection: 'column', gap: '5px'}}>
                                            <div>
                                                <Button variant="secondary" style={{width: '100%'}} onClick={() => console.log("View Sales")}>View Sales</Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md="2" >
                                <div style={{display: 'flex', justifyContent: 'right', flexDirection: 'column', gap: '5px'}}>
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
        </App>
    )
}