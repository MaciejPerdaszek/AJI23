import React, { useRef } from "react";
import '../styling/MainPage.css';
import { useNavigate } from "react-router-dom";

export default function ShoppingCart({ list, resetCart, setActivePage}) {

    const [amounts, setAmounts] = React.useState({});
    const formRef = useRef(null);
    let navigate = useNavigate();

    const handleIncrement = (productId) => {
        setAmounts((prevAmounts) => ({
            ...prevAmounts,
            [productId]: prevAmounts[productId] + 1,
        }));
    };

    const handleDecrement = (productId) => {
        setAmounts((prevAmounts) => ({
            ...prevAmounts,
            [productId]: Math.max(0, prevAmounts[productId] - 1),
        }));
    };

    const handleRemove = (productId, index) => {
        const newProductsCart = [...list];
        newProductsCart.splice(index, 1);
        setAmounts((prevAmounts) => {
            const newAmounts = { ...prevAmounts };
            delete newAmounts[productId];
            return newAmounts;
        });
        list.splice(index, 1);
    }

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        list.forEach((product) => {
            totalPrice += product.price * amounts[product.id];
        });
        return totalPrice;
    }

    const submitOrder = (e) => {
        e.preventDefault();
        const isFormValid = formRef.current.checkValidity();

        let products = [];
        for (let product of list) {
            products.push({
                product_id: product.id,
                amount: amounts[product.id],
            });
        }
        if (isFormValid) {
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const phoneInput = document.getElementById("phone");
            const order = {
                date: formatDate(new Date()),
                status: 1,
                username: nameInput.value,
                email: emailInput.value,
                phone_number: phoneInput.value,
                products: products
            };
            fetch("http://localhost:4000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            })
                .then((response) => response.json())
                .then(() => {
                    resetCart();
                    setActivePage('/')
                    navigate('/');
                    console.log("Order submitted successfully");

                })
        } else {
            formRef.current.reportValidity();
            console.log("Form is invalid!");
        }
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    React.useEffect(() => {
        const initialAmounts = {};
        list.forEach((product) => {
            initialAmounts[product.id] = 1;
        });
        setAmounts(initialAmounts);
    }, [list]);


    return (
        <div className="container-fluid">
            <h1>Shopping cart</h1>
            <div className="productsTable">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Product name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{Math.round(product.price, 2)}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDecrement(product.id)}>-</button>
                                </td>
                                <td>{amounts[product.id]}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleIncrement(product.id)}>+</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleRemove(product.id, index)}>Remove from cart</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-right float-right">
                <h4>Total Price: {Math.round(calculateTotalPrice(), 2)}</h4>
            </div>
            <hr></hr>
            <div className="container mt-3">
                <p className="text-center">Fill in the form below to submit your order.</p>
                <div className="d-flex justify-content-center">
                    <form ref={formRef} className="w-50">
                        <div className="form-group row mb-3">
                            <label htmlFor="name" className="col-sm-2 col-form-label">Name:</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="name" placeholder="exampleuser" required />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                            <div className="col-sm-6">
                                <input type="email" className="form-control" id="email" placeholder="example@gmail.com" required />
                            </div>
                        </div>

                        <div className="form-group row mb-3">
                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone:</label>
                            <div className="col-sm-6">
                                <input type="tel" className="form-control" id="phone" pattern="[0-9]{9}" placeholder="123456789" required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-6 offset-sm-2">
                                <button className="btn btn-primary" onClick={submitOrder}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}