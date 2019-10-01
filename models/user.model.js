(() => {
  const Promise = require('bluebird');
  const user = require('../config/schemas/user.schema');

  module.exports = {
    create,
    get,
    findOneAndUpdate,
    remove,
    findById,
  };


  function create(data) {
    return new Promise((resolve, reject) => {
      user.create(data, (err, newUser) => {
        if (err) return reject(err);
        resolve(newUser);
      });
    });
  }


  function findById(id) {
    return new Promise((resolve, reject) => {
      user.findById(id, (err, floorsData) => {
        if (err) {
          reject(err);
        } else {
          resolve(floorsData);
        }
      });
    });
  }

  function findOneAndUpdate(query, data) {
    return new Promise((resolve, reject) => {
      user.findOneAndUpdate(query, data, { new: true },
        (err, updateUser) => {
          if (err) {
            reject(err);
          } else {
            resolve(updateUser);
          }
        });
    });
  }

  function remove(query) {
    return new Promise((resolve, reject) => {
      user.findOneAndRemove(query).exec((err, remove) => {
        if (err) {
          reject(err);
        } else {
          resolve(remove);
        }
      });
    });
  }

  function get(query) {
    return new Promise((resolve, reject) => {
      user
        .findOne(query)
        .exec((err, building) => {
          if (err) {
            reject(err);
          } else {
            resolve(building);
          }
        });
    });
  }
})();
