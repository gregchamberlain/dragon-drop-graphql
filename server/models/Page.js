const BaseModel = require('./BaseModel');

const attributes = [
  'id',
  'title',
  'path',
  'items'
];

class Page extends BaseModel {

  constructor(data, projectId) {
    super('Page', attributes, data);
    this.projectId = projectId;
  }

  getKey() {
    return super.getKey(['Project', this.projectId, 'Page', this.path]);
  }

  getId(key) {
    return `${key.parent.name}@${key.name}`;
  }
  
}

function PageFactory(...args) {
  return new Page(...args);
}

module.exports = PageFactory;