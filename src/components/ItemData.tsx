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
                                <td style={{ backgroundColor: product.color }}> {product.id} </td>
                                <td style={{ backgroundColor: product.color }}> {product.name} </td>
                                <td style={{ backgroundColor: product.color }}> {product.year} </td>
                                <td style={{ backgroundColor: product.color }}> {product.color} </td>
                                <td style={{ backgroundColor: product.color }}> {product.pantone_value} </td>
                            </tr>)
                    }
                </tbody>
            </table>

        </>)
}
