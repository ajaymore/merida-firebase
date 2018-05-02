import gql from 'graphql-tag';

export const USER_QUERY = gql`
  {
    user {
      displayName
      roles {
        _id
        name
        createdAt
        updatedAt
      }
      superAdmin
      companyAdmin
      company {
        _id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export default null;
