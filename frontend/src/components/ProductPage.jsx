import React, { Component } from 'react';
import { GET_PRODUCT } from '../graphql/queries';
import { Navigate } from 'react-router';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import QueryWrapper from './QueryWrapper';
import { DataContext } from '../context/DataContext';
import { toKebabCase } from '../utils/stringUtils';
import ImageCarousel from './ImageCarousel';

class ProductPage extends Component {
  static contextType = DataContext
  constructor(props) {
    super(props);
    this.state = {
        product: {},
        selectedAttributes: {},
        numSelected: 0
    };
  }
  handleAttributeClick = (attributeId, itemValue) => {
    let increment = 0;
    if (!this.state.selectedAttributes[attributeId]) {
      increment = 1;
    }
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        [attributeId]: itemValue,
      },
      numSelected: prevState.numSelected + increment
    }));
  };

  handleDataFetch = (product) => {
    let selectedAttributes = {};
    // product.attributes.forEach((i) => {
    //   selectedAttributes[i.id] = i.items[0].id;
    // });
    this.setState({product, selectedAttributes, numSelected: 0});
  }

  render() {
    const { product, selectedAttributes, numSelected } = this.state;
    const { productId } = this.context
    
    if (!productId) {
        // return <Navigate to={'/home'} />
        return;
    }
    
    return (
        <QueryWrapper query={GET_PRODUCT} variables={{pid:productId}}>
        {({ loading, error, data }) => {
          if (loading) return <p>{null}</p>;
          if (error) return <p>Error :{error.message}</p>;
          if (data && data.product && (!product.id || data.product.id != product.id)) {                
              this.handleDataFetch(data.product)
          }

          const descriptionHtmlText = DOMPurify.sanitize(data.product.description)
          
          const descriptionElements = parse(descriptionHtmlText);

          return (
            <div className="flex flex-col lg:flex-row p-24">
                {/* Left Side - Image Carousel */}
                <ImageCarousel gallery={data.product.gallery} name={data.product.name} />
                {/* Right Side - Product Details */}
                <div className="w-full lg:w-1/2 pl-0 lg:pl-8 flex flex-col">
                    {/* Product Name */}
                    <h1 className="font-raleway text-3xl font-semibold mb-4">{data.product.name}</h1>

                    {/* Product Attributes */}
                    {data.product.attributes.map((attribute) => (
                      <div key={attribute.id} className="mb-6"
                        data-testid={`product-attribute-${toKebabCase(attribute.name)}`}
                      >
                        <h3 className="font-roboto-condensed text-lg font-bold leading-5 mb-2">{attribute.name.toUpperCase()}:</h3>
                        <div className="flex flex-wrap gap-x-2 gap-y-2">
                          {
                            attribute.type.toLowerCase() == 'text'?
                            attribute.items.map((item) => (
                              <button
                                  key={item.id}
                                  className={`font-normal text-lg leading-5 px-6 py-2 h-11 border border-black ${
                                  selectedAttributes[attribute.id] === item.id
                                      ? 'bg-black text-white'
                                      : 'bg-white text-gray-700'
                                  }`}
                                  onClick={() =>
                                  this.handleAttributeClick(attribute.id, item.id)
                                  }
                                  data-testid={`product-attribute-${toKebabCase(attribute.name)}-${item.value}`}
                              >
                                  {item.value}
                              </button>
                            )) :
                            attribute.items.map((item) => (
                              <button
                                  key={item.id}
                                  className={`h-9 w-9 bg-white p-px ${
                                  selectedAttributes[attribute.id] === item.id
                                      ? 'border-2 border-[#5ECE7B] border-solid'
                                      : ''
                                  }`}
                                  style={{'--my-color':item.value}}
                                  onClick={() =>
                                  this.handleAttributeClick(attribute.id, item.id)
                                  }
                                  data-testid={`product-attribute-${toKebabCase(attribute.name)}-${item.value}`}
                              >
                                <div className="w-full h-full bg-[var(--my-color)]"></div>
                              </button>
                            ))
                          }
                        </div>
                    </div>
                ))}

                {/* Price */}
                <div className="mb-6">
                    <h3 className="font-roboto-condensed text-lg font-semibold">Price:</h3>
                    <p className="font-raleway text-xl font-bold">
                    {data.product.prices[0].currency.symbol}
                    {(+(data.product.prices[0].amount)).toFixed(2)}
                    </p>
                </div>

                {/* Add to Cart Button */}
                <button
                    className={`font-raleway w-full md:w-1/2 py-2 text-white ${
                    (data.product.inStock && (numSelected === data.product.attributes.length))
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!(data.product.inStock) || (numSelected !== data.product.attributes.length)}
                    onClick={() => this.context.addCartItem(product, selectedAttributes)}
                    data-testid='add-to-cart'
                >
                    {data.product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>

                {/* Product Description */}
                <div className="mt-6 [&_*]:font-roboto"
                  data-testid='product-description'
                >
                    {descriptionElements}
                </div>
                </div>
            </div>
          );
        }}
      </QueryWrapper>
    );
  }
}

export default ProductPage;
