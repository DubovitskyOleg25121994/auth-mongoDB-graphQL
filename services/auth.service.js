(() => {
    const Promise   = require('bluebird');
    const argon2    = require('argon2');
    const jwt       = require('jsonwebtoken');
    const config    = require('../config/config');

    module.exports = {
        jwtCreate,
        generateHash,
        jwtVerify,
        comparePassword
    };

    function jwtCreate(user, params) {
        const type = params && params.type ? params.type : 'authorization';
        const payload = {
            _id: user._id,
            type
        };
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                config.JWT_KEY,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) {
                        reject(
                            new Error(
                                JSON.stringify({
                                    status: 400,
                                    type: 'JWT Generate Server Error'
                                })
                            )
                        );
                    } else {
                        resolve({ token, user });
                    }
                }
            );
        });
    }

    function jwtVerify(token, key) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, key || config.JWT_KEY, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

    function comparePassword(password, currentUser) {
        return new Promise((resolve, reject) => {
            const isEqual = argon2.verify(currentUser.password, password);
            if (isEqual) {
                return resolve(currentUser);
            } else if (!isEqual) {
                reject(
                    new Error(
                        JSON.stringify({
                            status: 400,
                            type: 'Passwords don\'t match'
                        })
                    )
                );
            } else {
                reject(
                    new Error(
                        JSON.stringify({
                            status: 400,
                            type: 'Login failed'
                        })
                    )
                );
            }
        });
    }

    function generateHash(password) {
        return new Promise(resolve => {
            const hash = argon2.hash(password);
            resolve(hash);
        });
    }
})();
