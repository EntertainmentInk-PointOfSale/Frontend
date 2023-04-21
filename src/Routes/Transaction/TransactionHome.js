import './TransactionHome.css'

import React from "react";
import App from "../../App"
import {
    Container,
    Row,
    Col
} from 'react-bootstrap'
export default function TransactionHome(props) {
    return(
        <App title="Transaction">
            <Container>
                    <Row>
                        <Col>
                            <div className='transaction-div'>
                                TABLE
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            INPUT
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            PRICE DISPLAY
                        </Col>
                        <Col>
                            CONTROLS
                        </Col>
                    </Row>
            </Container>
        </App>
    )
}