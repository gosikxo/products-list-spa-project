import React, { useState } from 'react'

export const TextInput = () => {
    const [SearchInput, SetSearchInput] = useState([])
    return (
        <>
            <input type="text">

            </input>
            <button>
                Search
            </button>
        </>
    )
}
