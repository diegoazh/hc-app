import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query AllProducts {
    products {
      id
      name
      images
      state
      city
      age
      type
      size
      health
      description
    }
  }
`;
