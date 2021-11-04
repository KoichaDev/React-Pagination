import { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table';
import MOCK_DATA from '../mock-data/MOCK_DATA.json';
import CheckBox from './CheckBox';
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import './table.css';

const RowSelection = () => {
    // ! The useTable library also recommends to use React use the Memoization-hook (useMemo).
    // ! If we didn't use memoize the columns and data, React Table would think that we are receiving new data on every render 
    // ! and then attempt to recalculate it a lot of logic every single time. This will definently affect the component performance 
    // const columns = useMemo(() => GROUPED_COLUMNS, []);
    const columns = useMemo(() => COLUMNS, []);
    const mockData = useMemo(() => MOCK_DATA, []);

    // This hook takes two properties to render the UI. 
    const tableInstance = useTable({
        columns: columns,
        data: mockData
    },
        useRowSelect, //This will give us a property to help us to keep track of our selected rows
        (hooks) => {
            // This gives  us what defines the columns you see in the browser
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => {
                            // This is to select the whole rows that exist on the row to get the object returned
                            return <CheckBox {...getToggleAllRowsSelectedProps()} />
                        },
                        Cell: ({ row }) => {
                            // This is to select specific checkbox user click for the row to get the object returned
                            return <CheckBox {...row.getToggleRowSelectedProps()} />

                        }
                    },
                    ...columns,
                ]
            })
        }
    )

    // These are functions and arrays from the hook that comes from the useHook package given to us to enable easy table creation
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups, //This will give us access our grouped of header such as first name, last name, id etc.
        footerGroups,
        rows,
        selectedFlatRows, //This will give you a flat array of rows that are currently selected in your table
        prepareRow } = tableInstance

    const firstPageRows = rows.slice(0, 10)

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => {
                        return <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                // The 'Header' property is located on the columns.js file, so basically, id, first_name, last_name etc.
                                return <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            })}
                        </tr>

                    })}
                </thead>
                <tbody {...getTableBodyProps}>
                    {firstPageRows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {
                                    row.cells.map(rowCell => {
                                        return <td {...rowCell.getCellProps()}>{rowCell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => {
                        return <>
                            <tr  {...footerGroup.getFooterGroupProps()}>
                                {footerGroup.headers.map(column => {
                                    return <>
                                        <td {...column.getFooterProps}>{column.render('Footer')}</td>
                                    </>
                                })}
                            </tr>
                        </>
                    })}
                </tfoot>
            </table>
            <pre>
                <code>
                    {JSON.stringify({
                        // We map over each row and "print" out the original row value in the browser
                        selectedFlatRows: selectedFlatRows.map(row => row.original),
                    }, null, 2)}
                </code>
            </pre>
        </>
    )
}

export default RowSelection
