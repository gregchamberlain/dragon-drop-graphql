const makeExecutableSchema = require('graphql-tools').makeExecutableSchema;

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

module.exports = makeExecutableSchema({ typeDefs, resolvers });