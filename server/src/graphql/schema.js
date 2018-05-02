const {
  UserType, CompanyType, RoleType, SiteType,
} = require('../models');

const api = `
  scalar Date

  input CompanyAdminInput {
    displayName: String!
    email: String!
    password: String!
  }

  input UserUpdateInput {
    name: String
  }

  type Query {
    user: User!
    companiesSuperAdmin(forSuperAdmin: Boolean!): [Company]!
  }

  type Mutation {
    createCompany(companyName: String!, companyAdminInput: CompanyAdminInput!): Company!
  }
`;

const types = [UserType, CompanyType, RoleType, SiteType];

module.exports = [...types, api];
