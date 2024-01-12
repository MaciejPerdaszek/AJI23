import React from 'react';
import { Form } from 'react-bootstrap';


function formatDate(dateText) {
    const date = new Date(dateText);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return year + '-' + month + '-' + day;
}

function handleChange_statusSelect(event, order) {
    const value = event.target.value;
    let orderProducts = [];
    for (let op of order.orderProducts) {
        orderProducts.push({
            product_id: op.product_id,
            amount: op.amount
        });
        }
    
    let updatedOrder = {
        date: formatDate(order.date),
        status: value,
        username: order.username,
        email: order.email,
        phone_number: order.phone_number,
        products: orderProducts
    }

    fetch("http://localhost:4000/orders/" + order.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
    }).then((response) => {
        if (response.ok) {
            alert("Order status changed successfully!");
            window.location.reload();
        } else {
            response.json().then((data) => {
                alert("Error changing order status: " + data.error);
                window.location.reload();
            });
        }
    });
}

export function renderCurrentOrdersTable(currentOrdersList, statuses, productsList) {
    return (
        <div className="ordersTable">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Products</th>
                            <th scope="col">Full Price</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                        Array.isArray(currentOrdersList) ? currentOrdersList.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.username}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phone_number}</td>
                                    <td>
                                        {
                                        Array.isArray(order.orderProducts) ? order.orderProducts.map((product, index) => (
                                            <div key={index}>
                                                {
                                                
                                                Array.isArray(productsList) && product ? productsList.find((p) => p.id === product.product_id).name + ' x' + product.amount: null
                                                } 
                                            </div>
                                        )) : null
                                    }
                                    </td>
                                    <td>{
                                        (() => {
                                            let fullPrice = 0;
                                            if(Array.isArray(order.orderProducts))
                                            for (let op of order.orderProducts) {
                                                
                                                fullPrice += op.amount * productsList.find((p) => p.id === op.product_id).price;
                                            }
                                            return Math.round(fullPrice,2);
                                        })()
                                        }</td>
                                    <td>{formatDate(order.date)}</td>
                                    <td>
                                        <Form.Select defaultValue={order.status} onChange={(event) => handleChange_statusSelect(event, order)}>
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