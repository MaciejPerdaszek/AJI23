import React, { useEffect } from "react";
import { renderEditProductForm } from "./forms";
import { renderProductTableFilter } from "../productsTable";
import { renderProductsTable, renderEditProductButton } from "../productsTable";
import '../../styling/MainPage.css';
import { renderCurrentOrdersTable } from "./currentOrdersTable";
import { renderOldOrdersTable } from "./ordersHistoryTable";
import { useNavigate } from "react-router-dom";

export default function AdminPage({setActivePage}) {
    let navigate = useNavigate();
    useEffect(() => {
        const password = prompt("Enter admin password");
        if(password !== "admin") {
            alert("Wrong password");
            setActivePage("/");
            navigate("/");
        }
    }, [navigate, setActivePage]);

    const [showEditProductForm, setShowEditProductForm] = React.useState(false);

    const [productsList, setProductsList] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [categoriesList, setCategoriesList] = React.useState([]);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [productToEdit, setProductToEdit] = React.useState({category:{}});

    const [statusesList, setStatusesList] = React.useState({});
    const [currentOrdersList, setCurrentOrdersList] = React.useState([]);
    const [oldOrdersList, setOldOrdersList] = React.useState([]);

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

    function getStatuses() {
        fetch("http://localhost:4000/status")
            .then(response => response.json())
            .then(data => setStatusesList(data))
            .catch(error => console.log(error));
    }

    function getOrders() {
        fetch("http://localhost:4000/orders")
            .then(response => response.json())
            .then(data => {
                let current = [];
                let old = [];
                for(let order of data) {
                    if(order.status !== 4 && order.status !== 5) {
                        current.push(order);
                    }
                    else {
                        old.push(order);
                    }
                }
                setCurrentOrdersList(current);
                setOldOrdersList(old);
            })
            .catch(error => console.log(error));
    }

    React.useEffect(() => {
        getProducts();
        getCategories();
        getStatuses();
        getOrders();
    }, []);


    return (
        <div className="AdminPage">
            <h1>Admin Page</h1>
            <h2>Products</h2>
            {renderEditProductForm(showEditProductForm, setShowEditProductForm, productToEdit, categoriesList, getProducts)}
            {renderProductTableFilter(searchTerm, setSearchTerm, 
                                    selectedCategory, setSelectedCategory, 
                                    categoriesList)}
            {renderProductsTable(productsList, searchTerm, selectedCategory, renderEditProductButton(setShowEditProductForm, setProductToEdit))}
            <h2>Current orders</h2>
            {renderCurrentOrdersTable(currentOrdersList, statusesList, productsList, getOrders)}
            <h2>Orders history</h2>
            {renderOldOrdersTable(oldOrdersList, statusesList, productsList)}
        </div>
    )
}