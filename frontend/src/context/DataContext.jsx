import { useMutation } from "@apollo/client";
import { createContext, useReducer } from "react";
import { PLACE_ORDER } from "../graphql/mutations";

export const DataContext = createContext()

export const stateReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            localStorage.setItem('cartItems', JSON.stringify(action.payload));
            return { ...state, cartItems: action.payload }
        case 'REMOVE_PRODUCT':
            localStorage.setItem('cartItems', JSON.stringify(action.payload));            
            return { ...state, cartItems: action.payload }
        case 'CLEAR_CART':
            localStorage.removeItem('cartItems');
            return { ...state, cartItems: [] }
        case 'CATEGORY_CHANGE':
            return {...state, category: action.payload.category}
        case 'PRODUCT_ID_CHANGE':
            return {...state, productId: action.payload.productId}
        default:
            return state
    }
}

export const DataContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(stateReducer, { 
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        category: '',
        productId: '',
    });
    const [placeOrderMutateFunction, { }] = useMutation(PLACE_ORDER, {
        onCompleted (data) {
            dispatch({type:'CLEAR_CART'});
            alert(data.order)
        },
        onError (error) {
            alert("Server Error: " + error.message)
        }
    });
    // handleDuplicateItems

    const addCartItem = (item, attributes = null) => {
        let itemWithAttributes = {...item};
        if (!attributes) {
            itemWithAttributes.selectedAttributes = {};

            item.attributes.forEach((i) => {
                itemWithAttributes.selectedAttributes[i.id] = i.items[0].id;
            });
        }
        else {
            itemWithAttributes.selectedAttributes = attributes;
        }
        
        // find duplicates
        let index = state.cartItems.findIndex(i => {
        if (i.id != itemWithAttributes.id) {
            return false;
        }
        let cond = true;
        i.attributes.forEach(att => {
            if (i.selectedAttributes[att.id] != itemWithAttributes.selectedAttributes[att.id]) {
            cond = false;
            }
        });
        return cond;
        });

        let newItems = state.cartItems

        if (index == -1) {
        itemWithAttributes.amount = 1;
        newItems.push(itemWithAttributes);
        dispatch({type:'ADD_PRODUCT',payload:newItems})
        } else {
        newItems[index].amount +=1;
        dispatch({type:'ADD_PRODUCT',payload:newItems})
        }
    }
    const removeCartItem = (itemWithAttributes) => {
        // find duplicates
        let index = state.cartItems.findIndex(i => {
        if (i.id != itemWithAttributes.id) {
            return false;
        }
        let cond = true;
        i.attributes.forEach(att => {
            if (i.selectedAttributes[att.id] != itemWithAttributes.selectedAttributes[att.id]) {
            cond = false;
            }
        });
        return cond;
        });

        let newItems = state.cartItems

        if (index !== -1) {
        newItems[index].amount -=1;
        if (newItems[index].amount === 0) {
            if (index === 0) {
            newItems.shift();
            }
            else {
            newItems = newItems.splice(index - 1, 1);
            }
        }
        dispatch({type:'REMOVE_PRODUCT',payload:newItems})
        }
    }
    const placeOrder = () => {
        if (!state.cartItems || state.cartItems.length === 0) return;
        let productList = [];
        state.cartItems.forEach(product => {
            let productEntery =  {
                productId: product.id,
                amount: product.amount,
                selectedAttributes:
                    Object.keys(product.selectedAttributes).map(attributeId => ({
                        attributeId,
                        productAttributeId: product.selectedAttributes[attributeId],
                    }))
            }
            productList.push(productEntery)
        });
        
        placeOrderMutateFunction({variables: {orderData: {productList}}});
    }


    const handleCategoryChange = (category)=>{
        if (category !== state.category) {
            dispatch({type:'CATEGORY_CHANGE', payload: { category }});
        }
    }
    const handleProductChange = (productId)=>{
        if (productId !== state.productId) {
            dispatch({type:'PRODUCT_ID_CHANGE', payload: { productId }});
        }
    }
    return (
        <DataContext.Provider value={{ ...state, dispatch,  addCartItem, removeCartItem, placeOrder, handleCategoryChange, handleProductChange}}>
            {children}
        </DataContext.Provider>
    )
}
