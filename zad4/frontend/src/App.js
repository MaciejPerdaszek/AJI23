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
  
  const [activePage, setActivePage] = React.useState("/");

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

  function resetCart() {
    setCartList([]);
  }

  return (
    <div className="App">
      <NavBar activePage={activePage} setActivePage={setActivePage}/>
      <Routes>
        <Route path="/" element={<MainPage addToCart={handleAddToCart} cartList={cartList} />} />
        <Route path="/shopping-cart" element={<ShoppingCart list={cartList} resetCart={resetCart} setActivePage={setActivePage}/>} />
        <Route path ="/admin" element={<AdminPage setActivePage={setActivePage}/>} />
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

