import React, { Component } from 'react';
import { DataContext } from '../context/DataContext';
import plus from '../assets/plus-btn.svg';
import minus from '../assets/minus-btn.svg';
import { toKebabCase } from '../utils/stringUtils';
class CartItem extends Component {
    static contextType = DataContext;

    render() {
        const { product } = this.props
        
        return (
            <div
            key={product.id}
            className="flex items-stretch border-b pb-4"
          >
            {/* Product Details */}
            <div className="w-1/2">
              {/* Attributes */}
                <div className="mt-2 space-y-1">
                <h3 className="font-raleway text-lg font-light text-left">{product.name}</h3>
                <p className="font-raleway text-base font-normal text-left">
                    {product.prices[0].currency.symbol}
                    {(+(product.prices[0].amount)).toFixed(2)}
                </p>
                {product.attributes.map((attribute) => (
                  <div key={attribute.id} className="text-sm"
                    data-testid={`cart-item-attribute-${toKebabCase(attribute.name)}`}
                  >
                    <span className="font-semibold font-raleway block text-left py-2">{attribute.name}: </span>
                    {/* <span>{attribute.selectedValue}</span> */}
                    {attribute.type == 'text'?
                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                    {attribute.items.map((item) => (
                    <div
                        key={item.id}
                        className={`font-normal text-sm leading-5 px-2 py-1 border border-black ${
                          product.selectedAttributes[attribute.id] == item.id
                            ? 'bg-black text-white'
                            : 'bg-white text-gray-700'
                        }`}
                        data-testid={`cart-item-attribute-${toKebabCase(attribute.name)}-${toKebabCase(attribute.name)}${(product.selectedAttributes[attribute.id] == item.id)? '-selected' : ''}`}
                    >
                        {item.value}
                    </div>
                    ))}
                </div>
                :
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                {attribute.items.map((item) => (
                <div
                    key={item.id}
                    className={`size-4 bg-white p-px ${
                      product.selectedAttributes[attribute.id] === item.id
                        ? 'border-2 border-[#5ECE7B] border-solid'
                        : ''
                    }`}
                    style={{'--my-color':item.value}}
                    data-testid={`cart-item-attribute-${toKebabCase(attribute.name)}-${toKebabCase(attribute.name)}${(product.selectedAttributes[attribute.id] == item.id)? '-selected' : ''}`}
                >
                    <div className="w-full h-full bg-[var(--my-color)]"></div>
                </div>
                ))}
            </div>
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Product Image */}
            <div className="w-1/2 relative">
                {/* Plus Button */}
                <button className="absolute top-0 left-0 p-0"
                  onClick={() => this.context.addCartItem(product, product.selectedAttributes)}
                  data-testid='cart-item-amount-increase'
                >
                    <img src={plus} alt="Increase Quantity" />
                </button>
                <p className="font-raleway absolute left-0 top-1/2 transform -translate-y-1/2 text-center w-6"
                    data-testid='cart-item-amount'
                >{product.amount}</p>
                {/* Minus Button */}
                <button className="absolute bottom-0 left-0 p-0"
                  onClick={() => this.context.removeCartItem(product)}
                  data-testid='cart-item-amount-decrease'
                >
                    <img src={minus} alt="Decrease Quantity" />
                </button>

                {/* Product Image */}
                <img
                    src={product.gallery[0]}
                    alt={product.name}
                    className="w-full h-full object-contain rounded-lg pl-8" 
                />
            </div>

          </div>
        );
    }
}

export default CartItem;