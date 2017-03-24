const Datastore = require('@google-cloud/datastore');

const datastore = Datastore({ projectId: 'dragon-drop-graphql' });

class BaseModel {

  constructor(modelName, attributes, data = {}) {
    attributes.forEach(key => {
      this[key] = data[key];
    });
    this._modelName = modelName;
    this._attributes = attributes;
    this._datastore = datastore;
    this._key = data[datastore.KEY];
  }

  create() {
    const transaction = datastore.transaction();
    let item;
    const newItem = {
      key: this.getKey(),
      data: this.getData()
    };
    return transaction.run()
      .then(() => (newItem.key.id || newItem.key.name) ? transaction.get(this.getKey()) : [])
      .then(result => {
        item = result[0];
        if (item) {
          return transaction.rollback();
        } else {
          transaction.save({
            key: this.getKey(),
            data: this.getData()
          });
          return transaction.commit();
        }
      }).then(() => {
        if (item) {
          throw new Error(`${this._modelName} with that id already exists`);
        } else {
          return this;
        }
      });
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

  json() {
    const result = {};
    this._attributes.forEach(attr => {
      result[attr] = this[attr];
    });
    return result;
  }

  query() {
    const query = datastore.createQuery(this._modelName);
    return datastore.runQuery(query).then(r => r[0].map(p => new this.constructor(p)));
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