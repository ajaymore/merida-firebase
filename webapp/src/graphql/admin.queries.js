import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id
      displayName
      uid
      email
      createdAt
      updatedAt
    }
  }
`;

export default null;
