import React from "react";
import '../styling/MainPage.css';

export default function ShoppingCart({list}) {

    React.useEffect(() => {
        console.log("ShoppingCart - Updated list:", list);
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}