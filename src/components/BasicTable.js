import { useMemo } from 'react'
import { useTable } from 'react-table';
import MOCK_DATA from '../mock-data/MOCK_DATA.json';
import { COLUMNS } from './columns'
import './table.css';

const BasicTable = () => {
    // ! The useTable library also recommends to use React use the Memoization-hook (useMemo).
    // ! If we didn't use memoize the columns and data, React Table would think that we are receiving new data on every render 
    // ! and then attempt to recalculate it a lot of logic every single time. This will definently affect the component performance 
    const columns = useMemo(() => COLUMNS, []);
    const mockData = useMemo(() => MOCK_DATA, []);

    // This hook takes two properties to render the UI. 
    const tableInstance = useTable({
        columns: columns,
        data: mockData
    })

    // These are functions and arrays from the hook that comes from the useHook package given to us to enable easy table creation
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

    return (
        <table {...getTableBodyProps()}>
            <thead>
                {headerGroups.map(headerGroup => {
                    return (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                return <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            })}
                        </tr>
                    )
                })}
            </thead>
            <tbody {...getTableBodyProps}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map(rowCell => {
                                    return <td {...rowCell.getCellProps()}>{rowCelly.render('Cell')}</td>
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default BasicTable
