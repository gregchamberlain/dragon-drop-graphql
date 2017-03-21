const Datastore = require('@google-cloud/datastore');

const datastore = Datastore({ projectId: 'dragon-drop-graphql' });

class BaseModel {

  constructor(modelName, attributes, data) {
    attributes.forEach(key => {
      this[key] = data[key];
    });
    this._modelName = modelName;
    this._attributes = attributes;
    this._datastore = datastore;
    this._key = data[datastore.KEY];
  }

  save() {
    const model = {
      key: this.getKey(),
      data: this.getData()
    };
    return datastore
      .save(model)
      .then(() => this);
  }

  getId() {
    return this._key && (this._key.id || this._key.name) || this._id;
  }

  get() {
    return datastore.get(this.getKey()).then(p => p[0] && new this.constructor(p[0]));
  }

  get id() {
    return this.getId();
  }

  set id(val) {
    this._id = val;
  }

  getKey(args) {
    if (this._key) return this._key;
    this._key = args ? datastore.key(args) : datastore.key([this._modelName, this.id]);
    return this._key;
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