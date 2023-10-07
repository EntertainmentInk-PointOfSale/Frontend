// import {useState} from "react";
// import axios from "axios";

import {
    Modal,
    Button
} from 'react-bootstrap'

export default function CustomerModal({show, setShow}) {

    const handleClose = () => setShow(false);

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title> Select Customer </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Ipsum
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}