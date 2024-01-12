import React from 'react';
import '../styling/NavBar.css';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NavBar({activePage, setActivePage}) {
    const navigate = useNavigate();
    const handleSelect = (eventKey) => {
        setActivePage(eventKey);
        navigate(eventKey);
    }

    return (
        <Nav variant="tabs" activeKey={activePage} onSelect={handleSelect}>
            <Nav.Item>
                <Nav.Link eventKey="/">Home page</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/shopping-cart">Shopping Cart</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/admin">Admin</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}