(() => {
  const Promise = require('bluebird');
  // const argon = require('argon2');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcryptjs');
  const config = require('../config/config');

  module.exports = {
    jwtCreate,
    generateHash,
    jwtVerify,
    comparePassword,
  };

  function jwtCreate(user, params) {
    const type = params && params.type ? params.type : 'authorization';
    const payload = {
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      type,
    };

    return new Promise(((resolve, reject) => {
      jwt.sign(payload, config.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          reject(new Error(JSON.stringify({
            status: 400,
            type: 'JWT Generate Server Error',
          })));
        } else {
          resolve({ token, user });
        }
      });
    }));
  }

  function jwtVerify(token, key) {
    return new Promise(((resolve, reject) => {
      jwt.verify(
        token,
        key || config.JWT_KEY,
        (err, decoded) => {
          if (err) {
            reject(new Error(JSON.stringify({
              status: 400,
              type: 'JWT Verify Server Error',
            })));
          } else {
            resolve(decoded);
          }
        },
      );
    }));
  }

  function comparePassword(password, currentUser) {
    return new Promise(((resolve, reject) => {
      bcrypt.compare(password, currentUser.password, (err, same) => {
        if (err) {
          // bcrypt internal error or smth.
          reject(new Error(JSON.stringify({
            status: 400,
            type: 'Login failed',
          })));
        } else if (!err && !same) {
          // wrong password
          reject(new Error(JSON.stringify({
            status: 400,
            type: 'Passwords don\'t match',
          })));
        } else {
          // user exists and credentials is correct
          return resolve(currentUser);
        }
      });
    }));
  }

  function generateHash(password) {
    return new Promise(((resolve) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hash(password, salt);
      resolve(hash);
    }));
  }
})();
