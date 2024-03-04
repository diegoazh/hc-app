import { gql } from '@apollo/client';

export const CORE_PRODUCT_FRAGMENT = gql`
  fragment CoreProductFragment on ProductEntity {
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
`;
