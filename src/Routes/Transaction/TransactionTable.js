import TableUtility from "../../Utility/TableUtility"

const columns = [
    {
        header: "Code",
        accessorKey: "lookup_code",
        enableSorting: false
    },
    {
        header: "Name",
        accessorKey: "name",
        enableSorting: false
    },
    {
        header: "Tax",
        accessorKey: "tax_name",
        enableSorting: false
    },
    {
        header: "Price",
        accessorKey: "selling_price",
        enableSorting: false
    }
]

const sorting = [
]

export default function TransactionTable({data}) {
    return (
        <TableUtility data={data} columns={columns} sorting={sorting}/>
    )
}