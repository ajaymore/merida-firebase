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
      isAdmin
    }
  }
`;

export const GET_ROLES_QUERY = gql`
  query GetRoles {
    roles {
      _id
      name
      createdAt
      updatedAt
    }
  }
`;

export default null;
