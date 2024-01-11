import React from "react";
import {Modal, Button, Form} from "react-bootstrap";

function handleSubmit_editProduct(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form); 
    fetch("http://localhost:4000/products/" + data.get("id"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.get("name"),
            description: data.get("description"),
            price: data.get("price"),
            weight: data.get("weight"),
            idcategory: data.get("idcategory")
        }),
    }).then((response) => {
        if (response.ok) {
            alert("Product edited successfully!");
            window.location.reload();
        }  else {
            response.json().then((data) => {
                alert("Error editing product: " + data.error);
                window.location.reload();
            });
        }
    });
}

export function renderEditProductForm(showEditProductForm, setShowEditProductForm, product) {
    return (
        <Modal show={showEditProductForm} centered>
            <Modal.Header>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event) => handleSubmit_editProduct(event)}>
                    <Form.Group controlId="productId">
                        <Form.Control name="id" type="text" defaultValue={product.id} />
                    </Form.Group>
                    <Form.Group controlId="productName">
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control name="name" type="text" defaultValue={product.name} />
                    </Form.Group>
                    
                    <Form.Group controlId="productDescription">
                        <Form.Label>Product Description:</Form.Label>
                        <Form.Control name="description" type="text" defaultValue={product.description} />
                    </Form.Group>

                    <Form.Group controlId="productPrice">
                        <Form.Label>Product Price:</Form.Label>
                        <Form.Control name="price" type="number" defaultValue={product.price} />
                    </Form.Group>

                    <Form.Group controlId="productWeight">
                        <Form.Label>Product Weight:</Form.Label>
                        <Form.Control name="weight" type="number" defaultValue={product.weight} />
                    </Form.Group>

                    <Form.Group controlId="productCategory">
                        <Form.Label>Product Category ID:</Form.Label>
                        <Form.Control name="idcategory" type="number" defaultValue={product.category.idcategory}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditProductForm(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}