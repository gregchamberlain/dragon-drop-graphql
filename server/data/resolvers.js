const GraphQLJSON = require('graphql-type-json');
const Datastore = require('@google-cloud/datastore');

const datastore = Datastore({ projectId: 'dragon-drop-graphql' });

module.exports = {
  JSON: GraphQLJSON,
  Project: {
    pages(project) {
      const ancestorKey = datastore.key(['Project', project.id]);
      const query = datastore.createQuery('Page').hasAncestor(ancestorKey);
      return datastore.runQuery(query).then(resp => resp[0]).then(pages => pages.map(p => {
        const key = p[datastore.KEY];
        p.id = `${key.parent.name}@${key.name}`;
        return p;
      }));
    }
  },
  Query: {
    projects() {
      const query = datastore.createQuery('Project');
      return datastore.runQuery(query).then(resp => resp[0]).then(projects => projects.map(p => {
        p.id = p[datastore.KEY].id || p[datastore.KEY].name;
        return p;
      }));
    },
    project(_, args) {
      const key = datastore.key(['Project', args.id]);
      return datastore.get(key).then(p => p[0]).then(p => {
        if (!p) return null;
        p.id = p[datastore.KEY].name;
        return p;
      });
    },
    page(_, args) {
      const split = args.id.split('@');
      const key =datastore.key(['Project', split[0], 'Page', split[1]]);
      return datastore.get(key).then(p => p[0]).then(p => {
        const keyid = p[datastore.KEY];
        p.id = `${keyid.parent.name}@${keyid.name}`;
        return p;
      });
    }
  },
  Mutation: {
    createProject(_, args) {
      const id = args.project.id;
      delete args.project.id;
      const project = {
        key: datastore.key(['Project', id]),
        data: args.project
      };
      return datastore.save(project).then(() => Object.assign({}, project.data, { id: id }));
    },
    createPage(_, args) {
      const page = {
        key: datastore.key(['Project', args.projectId, 'Page', args.page.path]),
        data: args.page
      };
      page.data.items = page.data.items || { root: { id: 'root', type: 'div', props: {}, children: [] } };
      return datastore.save(page).then(() => Object.assign({}, page.data, { id: `${args.projectId}@${page.key.name}` }));
    },
    updatePage(_, args) {
      const id = args.page.id;
      const split = id.split('@');
      const key = datastore.key(['Project', split[0], 'Page', split[1]]);
      delete args.page.id;
      const page = {
        key: key,
        data: args.page
      };
      return datastore.save(page).then(() => Object.assign({}, page.data, { id: id }));
    }
  }
};