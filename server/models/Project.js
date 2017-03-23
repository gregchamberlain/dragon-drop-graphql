const BaseModel = require('./BaseModel');
const Page = require('./Page');
const path = require('path');
const gcs = require('@google-cloud/storage')({
  projectId: 'dragon-drop-graphql',
});

const attributes = [
  'id',
  'name',
  'description'
];

var aclOptions = {
  entity: 'allUsers',
  role: gcs.acl.READER_ROLE
};

class Project extends BaseModel {

  constructor(data) {
    super('Project', ['id', 'name', 'description'], data);
  }

  get pages() {
    const query = this._datastore.createQuery('Page').hasAncestor(this.getKey());
    return this._datastore.runQuery(query).then(r => r[0].map(p => Page(p)));
  }

  create() {
    super.create().then(() => {
      console.log('Project Created!');
      return gcs.createBucket(`${this.id}.dragon-drop.com`);
    }).then(data => {
      console.log('Bucket Created!');
      return data[0].acl.default.add(aclOptions).then(() => data);
    }).then(data => {
      console.log('ACL applied');
      return data[0].upload(path.resolve(__dirname, '../static/index.html'));
    }).then(data => {
      console.log('index.html Uploaded!');
      const json = { project: this.json() };
      json.project.pages = [];
      const str = `window.__PROJECT_DATA__ = ${JSON.stringify(json)}`;
      return data[0].bucket.file('data.js').save(str);
    }).then(data => {
      console.log('data.js Uploaded!');
    }).catch(err => {
      console.error('ERROR:', err);
    });
  }

  deploy() {
    return Promise.all([
      this.get(),
      this.pages
    ]).then(response => {
      const project = response[0].json();
      project.pages = response[1].map(page => page.json());
      console.log(project);
      return 'success';
    });
  }
  
}

function ProjectFactory(project) {
  return new Project(project);
}

module.exports = ProjectFactory;