import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);

    const onChangeHander = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)
    return (
        <span>
            Search: {' '}
            <input
                type="text"
                value={value || ''}
                onChange={e => {
                    setValue(e.target.value);
                    onChangeHander(e.target.value)
                }}
            />
        </span>
    )
}

export default GlobalFilter
