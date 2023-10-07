import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import App from '../../App';

export default function DisplayProduct() {
    const {id} = useParams();
    const [isBusy, setIsBusy] = useState(true)
    const [product, setProduct] = useState(0)

    useEffect(() => {
        axios(
            {
                baseURL: "http://server:3001/api",
                url: `product/id/${id}`,
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            setProduct(response.data);
            setIsBusy(false);
        })
        .catch((err) => {
            console.log("ERROR: ",err)
        })
    },[id])

    return(
        <App title={product.product_name}>
            <Card>
                <Card.Header as="h5">Product</Card.Header>
                <Card.Body>
                    {
                        isBusy ? 
                        <b>Loading...</b>
                        :
                        <Table responsive>
                            <tbody>
                                <tr>
                                    <td>Display Name:</td>
                                    <td>{product.product_name}</td>
                                </tr>
                                <tr>
                                    <td>Lookup Code:</td>
                                    <td>{product.lookup_code}</td>
                                </tr>
                                <tr>
                                    <td>Selling Price:</td>
                                    <td>{product.selling_price}</td>
                                </tr>
                                <tr>
                                    <td>Purchase Price:</td>
                                    <td>{product.purchase_price}</td>
                                </tr>
                                <tr>
                                    <td>Stock Level:</td>
                                    <td>{product.stock_level}</td>
                                </tr>
                                <tr>
                                    <td>Creation Date:</td>
                                    <td>{product.creation_date}</td>
                                </tr>
                                <tr>
                                    <td>Last Updated:</td>
                                    <td>{product.last_updated}</td>
                                </tr>
                                <tr>
                                    <td>Tax Applied:</td>
                                    <td>{ product.tax_applied ? product.tax_applied.tax_name : ""}</td>
                                </tr>
                                <tr>
                                    <td>Supplier:</td>
                                    <td>{ product.supplier ? product.supplier.name : ""}</td>
                                </tr>
                                <tr>
                                    <td>Stock Category:</td>
                                    <td>{ product.stock_category ? product.stock_category.stock_name : ""}</td>
                                </tr>
                            </tbody>
                        </Table>
                    }
                </Card.Body>
            </Card>
        </App>
    )
}
