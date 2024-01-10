import React, { useRef } from "react";
import '../styling/MainPage.css';
import { useNavigate } from "react-router-dom";

export default function ShoppingCart({list}) {

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

      const handleRemove = (productId ,index) => {
        const newProductsCart = [...list];
        newProductsCart.splice(index, 1);
        setAmounts((prevAmounts) => {
            const newAmounts = {...prevAmounts};
            delete newAmounts[productId];
            return newAmounts;
        });
        list.splice(index, 1);
      }

    const calclulateTotalPrice = () => {
        let totalPrice = 0;
        list.forEach((product) => {
            totalPrice += product.price * amounts[product.id];
        });
        return totalPrice;
    }

    const submitOrder = (e) => {
        e.preventDefault();
        const isFormValid = formRef.current.checkValidity();
    
        if (isFormValid) {
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const phoneInput = document.getElementById("phone");
            const order = {
                date: new Date(),
                status: 1,
                username: nameInput.value,
                email: emailInput.value,
                phone_number: phoneInput.value,
                products: list
            };
            console.log(order);
            fetch("http://localhost:4000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            })
            .then((response) => response.json())
            .then((data) => {
                //navigate('/');
                console.log("Order submitted successfully");
                
            })
        } else {
          formRef.current.reportValidity();
          console.log("Form is invalid!");
        }
      };
        
    React.useEffect(() => {
        const initialAmounts = {};
        list.forEach((product) => {
            initialAmounts[product.id] = 0;
        });
        setAmounts(initialAmounts);
      }, [list]);
      

    return (
        <div className="container-fluid">
            <div className="row pb-5">
                <div className="col-md-12">
                    <div id="titleOnMainPage">
                        <h1 className="p-5">Shopping Cart</h1>
                    </div>
                </div>
            </div>
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
                                <td>{product.price}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDecrement(product.id)}>-</button>
                                </td>
                                <td>{amounts[product.id]}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => handleIncrement(product.id)}>+</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleRemove(product.id ,index)}>Remove from cart</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h3>Total Price: {calclulateTotalPrice()}</h3>
            </div>

            <form ref={formRef}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="exampleuser" required />
  
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="example@gmail.com" required />

                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" pattern="[0-9]{9}" placeholder="123456789" required />
                <button className="btn btn-primary" onClick={submitOrder}>Submit</button>
            </form>
        </div>
    )
}