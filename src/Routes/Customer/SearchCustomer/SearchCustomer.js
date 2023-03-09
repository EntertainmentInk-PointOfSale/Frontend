import {useState,useEffect,useReducer,useMemo,React} from 'react';
import './SearchCustomer.css'
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment';
import App from '../../../App';
import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Container, Row, Col } from 'react-bootstrap';
import {flexRender, 
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel} from '@tanstack/react-table'


export default function SearchCustomer() {
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectType, setSelectType] = useState("id")

    //Search Functionality
    const handleSearch = (event) => {
        event.preventDefault();

        var url = `customer/`

        if(searchQuery != "") {
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

    //Table definitions
    const [sorting, setSorting] = useState([{id: 'Name', desc: false}])
    const data = useMemo(() => searchResults, [searchResults])
    const columns = useMemo(() => [
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
            accessorKey: "Phone" 
        },
        {
            header: "Email",
            accessorKey: "Email"
        },
        {
            header: "View",
            id: "view_button",
            accessorKey: "ID",
            enableSorting: false,
            cell: props => <Button variant="secondary" size="sm" onClick={() => console.log("Hello!")}><b>View</b></Button>
            
        }
    ])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    })

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
                    <Table bordered hover>
                        <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                
                                {
                                header.isPlaceholder ? null : (
                                    <div
                                    {...{
                                        className: header.column.getCanSort()
                                          ? 'cursor-pointer select-none'
                                          : '',
                                        onClick: header.column.getToggleSortingHandler(),
                                      }}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext())}
                                        {
                                        {
                                        asc: ' 🔼',
                                        desc: ' 🔽',
                                        }[header.column.getIsSorted()] ?? null}
                                    </div>
                                )
                                }



                                </th>
                            ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody>
                        {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                            </tr>
                        ))
                        }
                        </tbody>
                    </Table>
                </Row>
            </Container>
            
        </App>
    )

}