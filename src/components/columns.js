// We want to map each column to a specific data value in the mock data
// This will help React table identify what data goes under which column in each row.
// ! One important thing: Even though we have data contains 8 column from the mock data. 
// ! The email and age is not included. This is to simply to showcase that you can pick what data needs to be rendered in the UI
// ! If a column left out from this column array, it won't make it into the UI. 

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id'
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
    },
    {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth'
    },
    {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country'
    },
    {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
    },
]