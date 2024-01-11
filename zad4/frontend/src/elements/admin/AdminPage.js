import React from "react";
import { renderEditProductForm } from "./forms";
import { renderProductTableFilter } from "../productsTable";
import { renderProductsTable, renderEditProductButton } from "../productsTable";
import '../../styling/MainPage.css';

export default function AdminPage() {

    const [showEditProductForm, setShowEditProductForm] = React.useState(false);

    const [productsList, setProductsList] = React.useState([]);
    const [productsCart, setProductCart] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [categoriesList, setCategoriesList] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [productToEdit, setProductToEdit] = React.useState({category:{}});


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
    }, [productsCart]);


    return (
        <div className="AdminPage">
            {renderEditProductForm(showEditProductForm, setShowEditProductForm, productToEdit)}
            {renderProductTableFilter(searchTerm, setSearchTerm, 
                                    selectedCategory, setSelectedCategory, 
                                    categoriesList)}
            {renderProductsTable(productsList, searchTerm, selectedCategory, renderEditProductButton(setShowEditProductForm, setProductToEdit))}
        </div>
    )
}