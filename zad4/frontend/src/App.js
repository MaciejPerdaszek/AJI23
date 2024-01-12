import React, { Component, useState } from 'react';
import './styling/App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from "./elements/NavBar";
import MainPage from "./elements/MainPage"
import ShoppingCart from "./elements/ShoppingCart"
import AdminPage from "./elements/admin/AdminPage"

import './styling/App.css';


const AppContent = () => {
  const [cartList, setCartList] = useState([]);

  function handleAddToCart(product) {
    const isProductInCart = cartList.some(cartProduct => cartProduct.id === product.id);
    if(isProductInCart) {
      const newCartList = cartList.filter(cartProduct => cartProduct.id !== product.id);
      setCartList(newCartList);
    }
    else {
      setCartList(prevCartList => [...prevCartList, product]);
    }
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage addToCart={handleAddToCart} cartList={cartList} />} />
        <Route path="/shopping-cart" element={<ShoppingCart list={cartList} />} />
        <Route path ="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  render() {
    return <AppContent />;
  }
}

export default App;

