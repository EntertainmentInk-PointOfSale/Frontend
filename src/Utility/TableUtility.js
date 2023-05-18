import {useState,React} from 'react';
import './TableUtility.css'
import Table from 'react-bootstrap/Table'
import {flexRender, 
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel} from '@tanstack/react-table'

export default function TableUtility({data, columns, initialSorting}) {
    const [sorting, setSorting] = useState(initialSorting)
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
    return (
        <Table size={"sm"} bordered hover responsive>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id} style={{textAlign: 'center'}}>
                        {
                        header.isPlaceholder ? null : (
                            <div
                                {
                                    ...{
                                    className: header.column.getCanSort()
                                        ? 'cursor-pointer select-none'
                                        : '',
                                    onClick: header.column.getToggleSortingHandler(),
                                    }
                                }
                            >
                                
                                {
                                    flexRender(
                                        header.column.columnDef.header,
                                        header.getContext())
                                }
                                
                                {
                                    {
                                        asc: <span className='pad-emoji'>🞁</span>,
                                        desc: <span className='pad-emoji'>🞃</span>
                                    }[header.column.getIsSorted()] ?? <span className='pad-emoji'>{header.column.getCanSort() ? '🞂' : ''}</span>
                                }
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
                <tr key={row.id} style={{textAlign: 'center', margin: 'auto'}}>
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
    )
}