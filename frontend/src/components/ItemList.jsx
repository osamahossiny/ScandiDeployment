import React, { Component } from 'react';
import ItemCard from './ItemCard';
import { GET_CATEGORY_PRODUCTS } from '../graphql/queries';
import { ParamChecker } from './ParamChecker';
import QueryWrapper from './QueryWrapper';
import { DataContext } from '../context/DataContext';

class ItemsList extends Component {
  static contextType = DataContext
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    }
  }

  handleItemsFetch = (items) => {
    this.setState({items})
  }

  handleAddItem = (event ,id) => {
    event.stopPropagation();
    const item = this.state.items.find((i) => i.id == id);
    this.context.addCartItem(item);
  }

  render() {
    const { items } = this.state;
    const { category } = this.context;

    const workingCategory = category || 'all';

    return (
      <QueryWrapper query={GET_CATEGORY_PRODUCTS} variables={{category: workingCategory}} >
        {({ loading, error, data }) => {
          if (loading) return <p>{null}</p>;
          if (error) return <p>Error : {error.message}</p>;
          if (data && items.length != data.products.length) {
            this.handleItemsFetch(data.products)
          }

          return (
            <div>
              <h2 className='font-raleway p-28 pt-36 text-4xl font-normal leading-10' >{`${workingCategory[0].toUpperCase()}${workingCategory.slice(1)}`}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-8 sm:px-28 mb-40">
                  {items.map((item) => (
                      <ItemCard key={item.id} image={item.gallery[0]} name={item.name} price={`${item.prices[0].currency.symbol}${(+(item.prices[0].amount)).toFixed(2)}`}
                      inStock={item.inStock} id={item.id} handleAddItem={this.handleAddItem}/>
                  ))}
              </div>
            </div>
          );
        }}
      </QueryWrapper>
    );
  }
}

export default ItemsList;
