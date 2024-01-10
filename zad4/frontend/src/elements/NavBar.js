import React from 'react';
import '../styling/NavBar.css';
import {Link} from "react-router-dom";

export default function NavBar() {

    return (
        <div className="NavBar">
            <nav className="navbar navbar-expand-lg">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link-unstyled">Home page</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/shopping-cart"} className="nav-link-unstyled">Shopping Cart</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}