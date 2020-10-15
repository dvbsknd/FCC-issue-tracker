'use strict';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dbName = process.env.NODE_ENV === 'test' ? process.env.MONGO_DATABASE_TEST : process.env.MONGO_DATABASE;
const assert = require('assert');

function Database(collection) {
  this.collection = collection;
  this.ObjectID = ObjectID;
}

Database.prototype.connect = function(callback) {
    MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err);
    callback(client.db(dbName).collection(this.collection));
  });
};

module.exports = Database;
