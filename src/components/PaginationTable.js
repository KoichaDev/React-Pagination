import { ca } from 'date-fns/locale';
import { useMemo } from 'react'
import { useTable, usePagination } from 'react-table';
import MOCK_DATA from '../mock-data/MOCK_DATA.json';
import { COLUMNS, GROUPED_COLUMNS } from './columns'
import './table.css';

const PaginationTable = () => {
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
    }, usePagination)

    // These are functions and arrays from the hook that comes from the useHook package given to us to enable easy table creation
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups, //This will give us access our grouped of header such as first name, last name, id etc.
        page, // Used for pagination
        nextPage, // React tables gives us this function so we can navigate as "next page"
        previousPage, // Same, but only "previous page"
        canNextPage, // this is to use for disabling the button click to go next page if there are no more page that exist
        canPreviousPage, // same thing with this, but only for the previous button instead
        pageOptions, // get the length of the object that exist total on the page
        setPageSize,  // Configuring to display page size number. Default comes with 10 from react table. We can fix it to display 50 for example
        state: {
            pageIndex,  // Displaying page index for incrementing by 1. It will observe where you are at in current pagination number 
            pageSize,  // “pageSize” of the initial state.
        },
        prepareRow,
        gotoPage, // Used to indicate which page number we want specific to go at 
        pageCount, // used for counting how many page left 
    } = tableInstance

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
                    {page.map(row => {
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
            </table>
            <div>
                <span>
                    page{' '}
                    <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                </span> {' '}

                <span>
                    | Go To Page: {' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                        style={{ width: '50px' }} />
                </span>

                <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                    {
                        // The array is to show how many rows we want to see on the site
                        [10, 25, 50].map(pageSize => {
                            return <>
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            </>
                        })
                    }

                </select>

                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>

            </div>
        </>
    )
}

export default PaginationTable
