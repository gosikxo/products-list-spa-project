import React, { useState } from 'react'
import { Product } from '../App'


export const Table = (props: { products: Product[] }) => {
    const [SearchInput, setSearchInput] = useState("0")

    const handleChange = (event: React.SyntheticEvent): void => {
        let target = event.target as HTMLInputElement;
        setSearchInput(target.value)
    }

    const handleClick = (): void => {

    }
    return (
        <>
            <input type="text" value={SearchInput} onChange={handleChange}>

            </input>
            <button onClick={handleClick}>
                Search
            </button>
            <table>
                <tbody>
                    <thead>

                        <th> Products </th>

                    </thead>
                    <tr>
                        <td> id </td>
                        <td> name </td>
                        <td> year </td>
                    </tr>
                    {
                        props.products.map(product => <tr>
                            <td> {product.id} </td>
                            <td> {product.name} </td>
                            <td> {product.year} </td>
                        </tr>)
                    }
                </tbody>
            </table>

        </>


    )
}
