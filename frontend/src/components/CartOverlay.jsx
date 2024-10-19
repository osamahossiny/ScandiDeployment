import React, { Component } from 'react';
import CartItem from './CartItem';
import { DataContext } from '../context/DataContext';

class CartOverlay extends Component {
  static contextType = DataContext
  render() {
    const { cartItems } = this.context
    const { isVisible } = this.props;

    let numItems = cartItems.reduce((ac,val) => ac + val.amount, 0);
    let total = cartItems.reduce((ac,val) => ac + (+(val.prices[0].amount) * val.amount), 0);
    let symbol = '';
    if (cartItems.length > 0) {
      symbol = cartItems[0].prices[0].currency.symbol;
    }
    
    if (!isVisible) return (null);

    return (
      <div className='relative'>
        {/* Overlay Background, but excluding the navbar */}
        <div className="fixed inset-x-0 bottom-0 top-[77px] bg-gray-800 bg-opacity-50 z-40" onClick={this.props.closeOverlay}></div>

        {/* Cart Overlay */}
        <div className="absolute right-[-1.5rem] mt-4 w-screen max-h-[90vh] overflow-y-auto no-scrollbar sm:w-80 bg-white p-4 shadow-lg z-50"
          data-testid="cart-overlay"
        >
          <p className="font-raleway text-base text-left block leading-6 font-bold mb-4">My bag,
            <label className="font-raleway text-base text-left leading-6 font-medium"> {numItems} {(numItems > 1)? "Items" : "Item"}</label>
          </p>


          {/* Product List */}
          <div className="flex flex-col space-y-4">
            {cartItems.map((product) => (
              <CartItem key={product.id} product={product}/>
            ))}
          </div>
          <div className='flex py-8'
            data-testid='cart-total'
          >
            <h1 className='font-roboto text-base font-medium' >Total:</h1>
            <span className='font-roboto text-base font-medium ml-auto'>{symbol}{total.toFixed(2)}</span>
          </div>
          <button
            className={`font-raleway w-full py-2 text-white  ${
              (numItems > 0)?
              'bg-[#5ECE7B] hover:bg-green-600'
              : 'bg-gray-500'
            }`}
            disabled={numItems === 0}
            onClick={() => this.context.placeOrder()}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;