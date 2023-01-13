import React from 'react'
import { Product } from '../App'

export const ItemData = (props: { products: Product[] }) => {
    return (
        <>
            <table>
                <tbody>
                    <thead>
                        <th> Products </th>
                    </thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>year</td>
                        <td>color</td>
                        <td>pantone_value</td>
                    </tr>
                    {props.products
                        .map(product =>
                            <tr>
                                <td> {product.id} </td>
                                <td> {product.name} </td>
                                <td> {product.year} </td>
                                <td> {product.color} </td>
                                <td> {product.pantone_value} </td>
                            </tr>)
                    }
                </tbody>
            </table>

        </>)
}
