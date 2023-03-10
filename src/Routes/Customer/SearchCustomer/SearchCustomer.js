import {React,useState,useEffect,} from 'react';
import axios from 'axios';
import App from '../../../App';
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Moment from 'react-moment';
import { Container, Row, Col } from 'react-bootstrap';

import CustomerTable from './CustomerTable'

//Helper
function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }

//Column schema for table
const columns = [
    {
        header: "ID",
        accessorKey: "ID"
    },
    {
        header: "Name",
        accessorKey: "Name",
        enableMultiSorting: true
    },
    {
        header: "Join Date",
        accessorKey: "Join_Date",
        cell: props => <Moment date={props.value}  format="YYYY-MM-DD"></Moment>
    },
    {
        header: "Phone",
        accessorKey: "Phone",
        enableSorting: false,
        cell: props => <span>{formatPhoneNumber(props.row.original.Phone) || props.row.original.Phone}</span>
    },
    {
        header: "Email",
        accessorKey: "Email"
    },
    {
        header: "View",
        id: "View_Customer",
        enableSorting: false,
        cell: props => <Button variant="secondary" size="sm" href={`/customer/id/${props.row.original.ID}`}><b>View</b></Button>
        
    }
]

//Default sorting
const sorting = [
    {id: 'Name', desc: false}
]

export default function SearchCustomer() {
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectType, setSelectType] = useState("id")

    //Search Functionality
    const handleSearch = (event) => {
        event.preventDefault();

        var url = `customer/`

        if(searchQuery !== "") {
            url += `?${selectType}=${searchQuery}`
        }

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
            console.log("RESPONSE: ")
            console.log(response)
            if(response.data.length <= 1) {
                setSearchResults(response.data);
            } else {
                setSearchResults(response.data);
            }
            
        })
    }
    
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
        .catch((err) => {
            console.log("Received error")
            console.log(err)
        })
    },[])

    return (
        <App title="Customers">
            <Container fluid>
                <Form onSubmit={handleSearch}>
                    <Row className="mb-3">
                        <Col style={{paddingRight: 0}} md={4}>
                            <Form.Control type="text"
                                defaultValue={searchQuery}
                                onChange={(e) => {setSearchQuery(e.target.value)}}/> 
                        </Col>
                        <Col style={{padding: 0}} md={1}>
                            <Form.Select 
                                style={{textAlign: "center", fontWeight: 'bold'}}
                                onChange={(e) => {setSelectType(e.target.value)}}>
                                <option value="id">ID</option>
                                <option value="name">Name</option>
                                <option value="join_date">Join Date</option>
                            </Form.Select>
                        </Col>
                        <Col style={{paddingLeft: 0}}md={1}>
                            <Button variant="primary" type="submit">Search</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <CustomerTable data={searchResults} columns={columns} initialSorting={sorting}/>
                </Row>
            </Container>
            
        </App>
    )

}