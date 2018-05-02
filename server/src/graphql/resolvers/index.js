const GraphQLDate = require('graphql-date');
const types = require('./type');
const Query = require('./query');
const Mutation = require('./mutation');

module.exports = {
  Date: GraphQLDate,
  ...types,
  Query,
  Mutation,
};
