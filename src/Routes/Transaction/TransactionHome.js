import './TransactionHome.css'

import {useEffect, useState} from "react";
import axios from 'axios';
import App from "../../App"
import {
    Container,
    Row,
    Form,
    Button
} from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import TransactionTable from './TransactionTable';
import { useLocalStorage } from '../../Utility/utility.storage';
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
                baseURL: "http://server:3001/api",
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

        setSubtotal(sub_temp);
        setTaxTotal(tax_temp);
        setTotal(sub_temp + tax_temp);
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
            <Container>
                    <Row className='mb-2'>
                        <Col>
                            <div className='transaction-div'>
                                <TransactionTable data={products} rowSelection={rowSelection} setRowSelection={setRowSelection}/>
                            </div>
                        </Col>
                    </Row>
                    <Form onSubmit={handleSearch}>
                        <Row className='mb-2'>
                                <Col md="10">
                                    <Form.Control 
                                    type="text"
                                    onChange={(e) => setSearchQuery(e.target.value)}/>
                                </Col>
                                <Col md="2">
                                    <Button variant="primary" type="submit" style={{width: '100%'}}>
                                        Submit
                                    </Button>
                                </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col>
                            <Row>
                                Subtotal: ${subtotal}
                            </Row>
                            <Row>
                                Tax Amount: ${taxTotal}
                            </Row>
                            <Row>
                                Total Due: ${total}
                            </Row>
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={() => removeSelected()}>Remove Selected</Button>
                        </Col>
                    </Row>
            </Container>
        </App>
    )
}