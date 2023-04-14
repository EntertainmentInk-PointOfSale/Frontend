import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import App from '../../App'
import { Card, Container, Col, Row } from "react-bootstrap";

export default function AddProduct(props) {
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
                                            <tr>
                                                <td>Supplier:</td>
                                                <td>
                                                    <b>TODO</b>
                                                </td>
                                            </tr>
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
                                            <tr>
                                                <td>Tax:</td>
                                                <td>
                                                    <b>TODO</b>
                                                </td>
                                            </tr>
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
                                        <tbody>
                                            <tr>
                                                <td>Category:</td>
                                                <td>
                                                    <b>TODO</b>
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