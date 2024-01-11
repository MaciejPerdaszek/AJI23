import React from "react";
import '../styling/MainPage.css';

export default function MainPage({ onAddToCart }) {

    const [productsList, setProductsList] = React.useState([]);
    const [productsCart, setProductCart] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [categoriesList, setCategoriesList] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState(null);


    function getProducts() {
        fetch("http://localhost:4000/products")
            .then(response => response.json())
            .then(data => setProductsList(data))
            .catch(error => console.log(error));
    }

    function getCategories() {
        fetch("http://localhost:4000/categories")
            .then(response => response.json())
            .then(data => setCategoriesList(data))
            .catch(error => console.log(error));
    }

    React.useEffect(() => {
        getProducts();
        getCategories();
        onAddToCart(productsCart);
    }, [productsCart]);


    return (
        <div className="MainPage">
            <div class="container mt-4">
                <div class="form-group row">
                    <label for="search" class="col-sm-2 col-form-label">Search:</label>
                    <div class="col-sm-6">
                        <input class="form-control mb-2" type="text" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <div class="form-group row">
                    <label for="category" class="col-sm-2 col-form-label">Select category:</label>
                    <div class="col-sm-6">
                        <select class="form-control mb-2" id="category" value={selectedCategory || ''} onChange={(e) => setSelectedCategory(e.target.value === '' ? null : parseInt(e.target.value, 10))}>
                            <option value="">All Categories</option>
                            {categoriesList.map((category) => (
                                <option key={category.idcategory} value={category.idcategory}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
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
                            <th scope="col">Category</th>
                            <th scope="col">Add to cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsList
                            .filter((product) =>
                                product.name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .filter((product) =>
                                selectedCategory ? product.idcategory === selectedCategory : true
                            )
                            .map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category.name}</td>
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