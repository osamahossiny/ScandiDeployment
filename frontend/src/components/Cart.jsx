import React, { Component } from 'react';
import cart from '../assets/cart.svg'
import CartOverlay from './CartOverlay';
import { DataContext } from '../context/DataContext';

class Cart extends Component {
  static contextType = DataContext
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      prevNumItems: -1
    }
  }

  closeOverlay = () => {
    this.setState({ isVisible: false });
  }
  openOverlay = () => {
    this.setState({ isVisible: true });
  }
  toggleOverlay = () => {
    this.setState((prev) => ({isVisible: !prev.isVisible}));
  }
  handleCartChange = () => {
    let numItems = this.context.cartItems.reduce((ac,val) => ac + val.amount, 0);
    this.setState({prevNumItems:numItems, isVisible: (this.state.prevNumItems !== -1)});
  }

  render() {
    const { cartItems } = this.context;
    const { isVisible, prevNumItems } = this.state;
    let numItems = cartItems.reduce((ac,val) => ac + val.amount, 0);
    
    if (numItems !== prevNumItems) {      
      this.handleCartChange();
    }

    return (
        <div className="fixed inline-block right-0 mr-4 sm:mr-16" >
          <button className="relative text-white p-2 rounded"
            onClick={this.toggleOverlay}
            data-testid='cart-btn'
          >
            <img
              src={cart}  // Replace with actual cart icon path
              alt="Cart"
              className="w-6 h-6 mx-auto"
            />
            {numItems > 0 && (
              <span className="font-roboto absolute top-2.5 right-2 transform translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {numItems}
              </span>
            )}
          </button>
          <CartOverlay isVisible={isVisible} closeOverlay={this.closeOverlay} />
        </div>        
    );
  }
}

export default Cart;
