const BaseModel = require('./BaseModel');

const attributes = [
  'id',
  'title',
  'path',
  'items'
];

const defaultItems = { root: { id: 'root', type: 'div', props: {}, children: [] } };

class Page extends BaseModel {

  constructor(data, projectId) {
    data.items = data.items || defaultItems;
    super('Page', attributes, data);
    this.projectId = projectId;
  }

  getKey() {
    return super.getKey(['Project', this.projectId, 'Page', this.id && parseInt(this.id)]);
  }
  
}

function PageFactory(...args) {
  return new Page(...args);
}

module.exports = PageFactory;