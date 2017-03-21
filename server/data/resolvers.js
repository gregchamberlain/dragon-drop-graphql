const GraphQLJSON = require('graphql-type-json');
const Datastore = require('@google-cloud/datastore');

const Project = require('../models/Project');
const Page = require('../models/Page');

const datastore = Datastore({ projectId: 'dragon-drop-graphql' });

module.exports = {
  JSON: GraphQLJSON,
  Project: {
    pages(project) {
      const ancestorKey = datastore.key(['Project', project.id]);
      const query = datastore.createQuery('Page').hasAncestor(ancestorKey);
      return datastore.runQuery(query).then(resp => resp[0]).then(pages => pages.map(p => Page(p)));
    }
  },
  Query: {
    projects() {
      const query = datastore.createQuery('Project');
      return datastore.runQuery(query).then(resp => resp[0]).then(projects => projects.map(p => Project(p)));
    },
    project(_, args) {
      const key = datastore.key(['Project', args.id]);
      return datastore.get(key).then(p => p[0]).then(p => Project(p));
    },
    page(_, args) {
      return Page({ id: args.id }, args.projectId).get();
      // const key = datastore.key(['Project', args.projectId, 'Page', args.id]);
      // return datastore.get(key).then(p => p[0]).then(p => Page(p));
    }
  },
  Mutation: {
    createProject(_, args) {
      return Project(args.project).save();
    },
    createPage(_, args) {
      return Page(args.page, args.projectId).save();
      // const page = {
      //   key: datastore.key(['Project', args.projectId, 'Page', args.page.path]),
      //   data: args.page
      // };
      // page.data.items = page.data.items || { root: { id: 'root', type: 'div', props: {}, children: [] } };
      // return datastore.save(page).then(() => Object.assign({}, page.data, { id: `${args.projectId}@${page.key.name}` }));
    },
    updatePage(_, args) {
      return Page(args.page, args.projectId).save();
      // const id = args.page.id;
      // const split = id.split('@');
      // const key = datastore.key(['Project', split[0], 'Page', split[1]]);
      // delete args.page.id;
      // const page = {
      //   key: key,
      //   data: args.page
      // };
      // return datastore.save(page).then(() => Object.assign({}, page.data, { id: id }));
    }
  }
};