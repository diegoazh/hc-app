import { gql } from '@apollo/client';

export const PRODUCTS = gql`
  query AllProducts {
    products {
      ...CoreProductFragment
    }
  }
`;
