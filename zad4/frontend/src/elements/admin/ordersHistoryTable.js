import React from 'react';
import { Form } from 'react-bootstrap';


function formatDate(dateText) {
    const date = new Date(dateText);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + '-' + month + '-' + day;
}

export function renderOldOrdersTable(oldOrdersList, statuses, productsList) {
    return (
        <div className="oldOrdersTable">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Products</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                        Array.isArray(oldOrdersList) ? oldOrdersList.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.username}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phone_number}</td>
                                    <td>
                                        {
                                        Array.isArray(order.orderProducts) ? order.orderProducts.map((product, index) => (
                                            <div key={index}>
                                                {
                                                Array.isArray(productsList) ? productsList.find((p) => p.id === product.product_id).name + ' x' + product.amount: null
                                                } 
                                            </div>
                                        )) : null
                                    }
                                    </td>
                                    <td>{formatDate(order.date)}</td>
                                    <td>
                                        <Form.Select value={order.status} readOnly disabled>
                                            {Object.keys(statuses).map((key, index) => (
                                                <option key={index} value={statuses[key]}>{key}</option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                </tr>
                            )) : null
                        }
                    </tbody>
                </table>
            </div>
    )
}