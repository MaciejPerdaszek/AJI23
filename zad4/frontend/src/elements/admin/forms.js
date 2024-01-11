import React from "react";
import {Modal, Button, Form} from "react-bootstrap";

function handleSubmit_editProduct(event) {
    event.preventDefault();
    const form = event.target;
    let data = new FormData(form);
    data = Object.fromEntries(data);
    console.log(data);

    fetch("http://localhost:4000/products/" + data.get("id"), {
        method: "PUT",
        body: data,
    }).then((response) => {
        if (response.ok) {
            alert("Product edited successfully!");
            window.location.reload();
        } else {
            alert("Error editing product!");
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
                        <Form.Control type="text" defaultValue={product.id} />
                    </Form.Group>
                    <Form.Group controlId="productName">
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control type="text" defaultValue={product.name} />
                    </Form.Group>
                    
                    <Form.Group controlId="productDescription">
                        <Form.Label>Product Description:</Form.Label>
                        <Form.Control type="text" defaultValue={product.description} />
                    </Form.Group>

                    <Form.Group controlId="productPrice">
                        <Form.Label>Product Price:</Form.Label>
                        <Form.Control type="number" defaultValue={product.price} />
                    </Form.Group>

                    <Form.Group controlId="productCategory">
                        <Form.Label>Product Category ID:</Form.Label>
                        <Form.Control type="text" defaultValue={product.category.idcategory}/>
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