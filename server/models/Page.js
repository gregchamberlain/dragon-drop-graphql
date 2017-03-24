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
    if (this.id) {
      return super.getKey(['Project', this.projectId, 'Page', parseInt(this.id)]);
    } else {
      return super.getKey(['Project', this.projectId, 'Page']);
    }
  }
  
}

function PageFactory(...args) {
  return new Page(...args);
}

module.exports = PageFactory;