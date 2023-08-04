import { useRef, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import {flexRender, 
    getCoreRowModel,
    useReactTable} from '@tanstack/react-table'

const columns = [
    {
        id: "selection",
        header: ({table}) => (
            <IndeterminateCheckbox
                {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
                }}
            />
        ),
        cell: props => <IndeterminateCheckbox
                        {...{
                            checked: props.row.getIsSelected(),
                            disabled: !props.row.getCanSelect(),
                            indeterminate: props.row.getIsSomeSelected(),
                            onChange: props.row.getToggleSelectedHandler(),
                        }}
                        />,
        size: 20
    },
    {
        header: "Code",
        accessorKey: "lookup_code",
    },
    {
        header: "Name",
        accessorKey: "product_name",
    },
    {
        header: "Tax",
        accessorKey: "tax_applied.tax_name",
        size: 30
    },
    {
        header: "Price",
        accessorKey: "selling_price",
        size: 60
    }
]

export default function TransactionTable({data, rowSelection, setRowSelection}) {
    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Table size={"sm"} style={{borderCollapse: 'collapse'}} hover striped>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} style={{borderRight: 'solid 1px #d3d3d3', borderBottom: 'solid 1px #d3d3d3', textAlign: 'center', width: header.getSize(),}}>
                            {
                                flexRender(header.column.columnDef.header,header.getContext())
                            }
                        </th>
                    ))}
                    </tr>
                ))}
            </thead>

            <tbody>
                {
                    table.getRowModel().rows.map(row => (
                        <tr key={row.id} style={{textAlign: 'center'}}>
                            {
                                row.getAllCells().map(cell => (
                                    <td key={cell.id} style={{width: cell.column.getSize()}}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

function IndeterminateCheckbox({
    indeterminate,
    className = '',
    ...rest
  }) {
    const ref = useRef()
  
    useEffect(() => {
      if (typeof indeterminate === 'boolean') {
        ref.current.indeterminate = !rest.checked && indeterminate
      }
    }, [ref, indeterminate, rest.checked])
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
      />
    )
  }