import React, { Component, useEffect, useState } from 'react';
import './styling/App.css';
import { Route, Routes } from "react-router-dom";
import NavBar from "./elements/NavBar";
import MainPage from "./elements/MainPage"
import ShoppingCart from "./elements/ShoppingCart"
import AdminPage from "./elements/admin/AdminPage"

import './styling/App.css';


const AppContent = () => {
  let cartList = [];

  function handleAddToCart(product) {
    if(cartList.includes(product)) {
      return;
    }
    cartList.push(product);
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage addToCart={handleAddToCart} />} />
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

