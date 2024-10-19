import React, { Component } from 'react';
import quick from '../assets/quick-shop.svg'
import { Link } from 'react-router-dom';
import { toKebabCase } from '../utils/stringUtils';
class ItemCard extends Component {

  render() {
    const { image, name, price, inStock, id, handleAddItem } = this.props;
    return (
        <div className="relative bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
        >
          <Link to={`/product/${id}`}
            data-testid={`product-${toKebabCase(name)}`}
          >

            <div className='relative w-full h-96 inline-block z-0'>
              <img src={image} alt={name} className="w-full h-96 object-contain" />

              {!inStock &&
              <div className="absolute inset-0 bg-[#FFFFFF] bg-opacity-50 z-10 flex items-center justify-center">
                <p className="font-raleway font-normal text-2xl text-center text-[#8D8F9A]">OUT OF STOCK</p>
              </div>
              }
            </div>
            <div className="p-2 sm:p-4">
              <h2 className="font-raleway h-7 text-lg font-light leading-4 text-center sm:text-left">{name}</h2>
              <p className={`font-raleway h-7 mt-1 text-lg leading-7 text-center sm:text-left ${!inStock && 'text-[#8D8F9A]'}`}>{price}</p>
            </div>
          </Link>
          {inStock &&
          <button onClick={(event) => handleAddItem(event,id)} className="absolute bottom-16 right-8 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <img src= {quick} alt="quick shop button" />
          </button>
          }
        </div>
    );
  }
}

export default ItemCard;
