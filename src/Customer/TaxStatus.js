import {React} from 'react';

import Table  from 'react-bootstrap/Table'
import Button  from 'react-bootstrap/Button';

import './Customer.css';

export function DisplayTaxStatus(props) {
    return(
        <>
            <Table size="sm" responsive>
                <tbody>
                    <tr>
                        <td>Tax Exempt:</td>
                        <td>{props.customer.Tax_Exempt ? "Exempt" : "Not Exempt"}</td>
                    </tr>
                    <tr>
                        <td>Status ID</td>
                        <td>{props.customer.Tax_Exempt_Number == null ? "N/A" : props.customer.Tax_Exempt_Number}</td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                    </tr>
                </tbody>
            </Table>
            <div className="col text-center">
                <Button type="button" variant="outline-primary">Edit Status</Button>
            </div>
        </>
    )
}