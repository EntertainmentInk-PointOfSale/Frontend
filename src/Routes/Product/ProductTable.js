import TableUtility from '../../Utility/TableUtility'
import { Button } from 'react-bootstrap'

const columns = [
    {
        header: "Code",
        accessorKey: "lookup_code"
    },
    {
        header: "Name",
        accessorKey: "product_name",
        id:"Name"
    },
    {
        header: "Price",
        accessorKey: "selling_price"
    },
    {
        header: "Cost",
        accessorKey: "purchase_price"
    },
    {
        header: "Stock",
        accessorKey: "stock_level"
    },
    {
        header: "Tax",
        accessorKey: "tax_applied.tax_name"
    },
    {
        header: "View",
        id: "view_customer",
        cell: props => <Button variant="secondary" size="sm" href={`/product/${props.row.original.product_id}`}><b>View</b></Button>
    },
]

const sorting = [
    {id: 'Name', desc: false}
]

export default function ProductTable({data}) {
    return ( 
        <TableUtility data={data} columns={columns} initialSorting={sorting}/>
    )
}