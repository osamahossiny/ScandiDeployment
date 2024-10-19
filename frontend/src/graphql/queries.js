import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
    query {
        categories {
            name
        }
    }
`;

export const GET_CATEGORY_PRODUCTS = gql`
    query ($category: String) {
        products(category: $category) {
            id
            name
            inStock
            gallery
            description
            brand
            prices {
                amount
                currency {
                label
                symbol
                }
            }
            category
            attributes {
                id
                productId
                name
                type
                items {
                    id
                    value
                    displayValue
                }
            }
        }
    }
`
export const GET_PRODUCT = gql`
    query ($pid: String!) {
        product(pid: $pid) {
            id
            name
            inStock
            gallery
            description
            brand
            prices {
                amount
                currency {
                label
                symbol
                }
            }
            category
            attributes {
                id
                productId
                name
                type
                items {
                    id
                    value
                    displayValue
                }
            }
        }
    }
`