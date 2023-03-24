import TableUtility from '../Utility/TableUtility'

const columns = [
    {
        header: "Code",
        accessorKey: "lookup_code"
    },
    {
        header: "Name",
        accessorKey: "product_name"
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
]

const sorting = [
    {id: 'Name', desc: false}
]

export default function ProductTable({data}) {
    return ( 
        <TableUtility data={data} columns={columns} initialSorting={sorting}/>
    )
}