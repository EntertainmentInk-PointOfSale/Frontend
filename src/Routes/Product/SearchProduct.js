import {useState,useEffect,} from 'react';
import App from "../../App"
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import ProductTable from './ProductTable';

export default function SearchProduct() {
    const [searchData,setSearchData] = useState([]);

    useEffect(() => {
        axios(
            {
                baseURL: "http://localhost:3001/api",
                url: "product/",
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                },
                method: 'get'
            }
        )
        .then((response) => {
            setSearchData(response.data);
        })
        .catch((err) => {
            console.log("Received error")
            console.log(err)
        })
    },[])

    return(
        <App title="Products">
            <Container fluid>
                <Row>
                    <p>Holder...</p>
                </Row>
                <Row>
                    <ProductTable data={searchData}/>
                </Row>
            </Container>
        </App>
    )
}