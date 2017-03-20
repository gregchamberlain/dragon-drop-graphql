const Datastore = require('@google-cloud/datastore');

const datastore = Datastore({ projectId: 'dragon-drop-graphql' });

class BaseModel {

  constructor(modelName, attributes, data) {
    this._modelName = modelName;
    this._attributes = attributes;
    this._datastore = datastore;
    const storeKey = data[datastore.KEY];
    attributes.forEach(key => {
      this[key] = data[key];
    });
    if (storeKey) {
      this.id = this.getId(storeKey);
    }
  }

  save() {
    const model = {
      key: this.getKey(),
      data: this.getData()
    };
    this.id = this.getId(model.key);
    return datastore
      .save(model)
      .then(() => this);
  }

  getId(key) {
    return key.id || key.name;
  }

  getKey(args) {
    if (args) {
      return datastore.key(args);
    } else {
      return datastore.key([this._modelName, this.id]);
    }
  }

  getData() {
    const data = {};
    this._attributes.forEach(key => {
      if (key === 'id') return;
      data[key] = this[key];
    });
    return data;
  }

}

module.exports = BaseModel;