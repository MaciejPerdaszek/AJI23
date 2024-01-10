import React from "react";
import '../styling/MainPage.css';

export default function MainPage({onAddToCart}) {

    const [productsList, setProductsList] = React.useState([]);
    const [productsCart, setProductCart] = React.useState([]);

    function getProducts() {
        fetch("http://localhost:4000/products")
            .then(response => response.json())
            .then(data => setProductsList(data))
            .catch(error => console.log(error));
    }

    React.useEffect(() => {
        getProducts();
        console.log(typeof productsCart);
        console.log(productsCart);
        onAddToCart(productsCart);
    }, [productsCart]);


    return (
        <div className="MainPage">
            <div className="row pb-5">
                <div className="col-md-12">
                    <div id="titleOnMainPage">
                        <h1 className="p-5">Product browser</h1>
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
                            <th scope="col">Add to cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsList.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => {
                                        const newProductsCart = [...productsCart, product];
                                        setProductCart(newProductsCart);
                                    }}>Add to cart</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}