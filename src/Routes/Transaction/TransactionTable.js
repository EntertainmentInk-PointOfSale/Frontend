import { useState, useRef, useEffect } from 'react'
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
                        /> 
        
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
    },
    {
        header: "Price",
        accessorKey: "selling_price",
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
        <Table size={"sm"} hover responsive>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id} style={{textAlign: 'center'}}>
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
                        <tr key={row.id} style={{textAlign: 'center', margin: 'auto'}}>
                            {
                                row.getAllCells().map(cell => (
                                    <td key={cell.id}>
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
    }, [ref, indeterminate])
  
    return (
      <input
        type="checkbox"
        ref={ref}
        className={className + ' cursor-pointer'}
        {...rest}
      />
    )
  }