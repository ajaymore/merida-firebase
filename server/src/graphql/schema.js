const { UserType, RoleType } = require('../models');

const api = `
  scalar Date

  input UserInput {
    displayName: String!
    email: String!
    password: String!
  }

  type Query {
    user: User!
    roles: [Role!]!
  }

  type Mutation {
    createUser(userInput: UserInput!): User!
  }
`;

const types = [UserType, RoleType];

module.exports = [...types, api];
