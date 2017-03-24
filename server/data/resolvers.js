const GraphQLJSON = require('graphql-type-json');
const Datastore = require('@google-cloud/datastore');

const Project = require('../models/Project');
const Page = require('../models/Page');

const datastore = Datastore({ projectId: 'dragon-drop-graphql' });

module.exports = {
  JSON: GraphQLJSON,
  Query: {
    projects: () => Project().query(),
    project: (_, args) => Project({ id: args.id}).get(),
    page: (_, args) =>  Page({ id: args.id }, args.projectId).get(),
  },
  Mutation: {
    createProject: (_, args) => Project(args.project).create(),
    createPage: (_, args) => Page(args.page, args.projectId).create(),
    updatePage: (_, args) => Page(args.page, args.projectId).save(),
    deployProject: (_, args) => Project({ id: args.projectId }).deploy()
  }
};