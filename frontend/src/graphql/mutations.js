import { gql } from '@apollo/client';

export const PLACE_ORDER = gql`
  mutation Order($orderData: Order!) {
    order(orderData: $orderData)
  }
`;
