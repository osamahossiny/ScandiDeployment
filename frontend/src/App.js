import React, { Component } from 'react';
import Header from './components/Header';
import ItemsList from './components/ItemList';
import ProductPage from './components/ProductPage';
import { DataContext } from './context/DataContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ParamChecker } from './components/ParamChecker';

class App extends Component {
  static contextType = DataContext;
  render() {    
    const { cartItems } = this.context
    return (
      <Router>
        <Header name={"Header"} cartItems={cartItems} addCartItem={this.context.addCartItem} removeCartItem={this.context.removeCartItem} placeOrder={this.context.placeOrder} />

        <Routes >

          <Route exact path="/" element={
            <>
              <ParamChecker handleChange={this.context.handleCategoryChange} paramName={'category'}/>
              <ItemsList />
            </>
            } />
          
          <Route exact path="/:category" element={
            <>
              <ParamChecker handleChange={this.context.handleCategoryChange} paramName={'category'}/>
              <ItemsList />
            </>
            } />

          <Route path="/product/:productId" element={
            <>
              <ParamChecker handleChange={this.context.handleProductChange} paramName={'productId'}/>
              <ProductPage />
            </>
            } />

        </Routes>
      </Router >
    );
  }
}

export default App;