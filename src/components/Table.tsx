import React from 'react'
import { Product } from '../App'


export const Table = (props: { products: Product[], onClick: (productId: number) => void }) => {
    return (
        <>

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
                    {props.products
                        .map(product =>
                            <tr onClick={() => props.onClick(product.id)}>
                                <td style={{ backgroundColor: product.color }}> {product.id} </td>
                                <td style={{ backgroundColor: product.color }}> {product.name} </td>
                                <td style={{ backgroundColor: product.color }}> {product.year} </td>
                            </tr>)
                    }
                </tbody>
            </table>

        </>


    )
}
