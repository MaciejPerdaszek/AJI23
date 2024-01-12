import React from "react";
import '../styling/MainPage.css';
import { render } from "vue";
import { renderAddToCartButton, renderProductsTable } from "./productsTable";
import { renderProductTableFilter } from "./productsTable";

export default function MainPage({addToCart}) {

    const [productsList, setProductsList] = React.useState([]);
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
    }, []);



    return (
        <div className="MainPage">
            {renderProductTableFilter(searchTerm, setSearchTerm, 
                                    selectedCategory, setSelectedCategory, 
                                    categoriesList)}
            
            {renderProductsTable(productsList, searchTerm, selectedCategory, renderAddToCartButton(addToCart))}
        </div>
    )
}