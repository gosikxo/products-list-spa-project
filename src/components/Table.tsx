import React from 'react'
import { Product } from '../App'


export const Table = (props: { products: Product[] }) => {
    return (
        <table>
            <tbody>
                <thead>
                    <tr>
                        <th> Products </th>
                    </tr>
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

    )
}
