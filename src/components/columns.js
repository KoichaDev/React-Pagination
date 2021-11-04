// We want to map each column to a specific data value in the mock data
// This will help React table identify what data goes under which column in each row.
// ! One important thing: Even though we have data contains 8 column from the mock data. 
// ! The email and age is not included. This is to simply to showcase that you can pick what data needs to be rendered in the UI
// ! If a column left out from this column array, it won't make it into the UI. 

export const COLUMNS = [
    {
        header: 'Id',
        accessor: 'id'
    },
    {
        header: 'First Name',
        accessor: 'first_name',
    },
    {
        header: 'Last Name',
        accessor: 'last_name',
    },
    {
        header: 'Date of Birth',
        accessor: 'date_of_birth'
    },
    {
        header: 'Country',
        accessor: 'country'
    },
    {
        header: 'Phone',
        accessor: 'phone'
    },
]