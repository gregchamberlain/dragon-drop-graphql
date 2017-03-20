const BaseModel = require('./BaseModel');

const attributes = [
  'id',
  'name',
  'description'
];

class Project extends BaseModel {

  constructor(data) {
    super('Project', ['id', 'name', 'description'], data);
  }
  
}

function ProjectFactory(project) {
  return new Project(project);
}

module.exports = ProjectFactory;