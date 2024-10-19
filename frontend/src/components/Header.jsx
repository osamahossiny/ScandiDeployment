import React, { Component } from 'react';
import reload from '../assets/reload.svg'
import Cart from './Cart';
import { GET_CATEGORIES } from '../graphql/queries';
import { Link, Navigate } from 'react-router-dom';
import QueryWrapper from './QueryWrapper';
import NoData from './NoData';
import { DataContext } from '../context/DataContext';

class Header extends Component {
  static contextType = DataContext
  constructor(props) {
    super(props);    
    this.state = {
      selectedOption: 'all',
    };
  }
  handleRouteChange = (option) => {
    this.setState({selectedOption: option})
  }

  render() {
    const { selectedOption } = this.state;
    const { category } = this.context;

    if ((selectedOption != category)) {
      if (category) {
        this.handleRouteChange(category);
      } else if (selectedOption != 'all') {
        this.handleRouteChange('all');
      }
    }
    
    return (
      <QueryWrapper query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          if (loading) return <p>{null}</p>;
          if (error) return <p>Error : {error.message}</p>;

          return (
            data.categories.length !== 0 ?
            <nav className="fixed w-screen h-[77px] flex justify-between items-center p-5 bg-white z-10">
              <ul className="flex space-x-2 sm:space-x-8 pl-4 sm:pl-24">
                {data.categories.map((option) => (
                  <li
                    key={option.name}
                    className={`relative cursor-pointer font-raleway text-base font-semibold leading-5 ${
                      selectedOption === option.name
                        ? 'text-green-500 after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-green-500 after:left-0 after:bottom-[-32px]'
                        : 'text-gray-700'
                    }`}
                  >
                    <Link to={`/${option.name}`} data-testid={option.name === selectedOption? 'active-category-link':`category-link-${option.name.toLowerCase()}`}>
                    {option.name.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to={`/`} className="fixed flex-shrink-0 left-1/2 transform -translate-x-1/2 px-4 py-2"
              >
                <img src={reload} alt="" />
              </Link>
              <Cart />
            </nav>
            :
            <NoData />
          );
        }}
      </QueryWrapper>
    )
  }
}

export default Header;
