(() => {
    'use strict';

    const AuthService = require('../services/auth.service');

    module.exports = async function(req, res, next) {
        try {
            if (req && req.headers && req.headers.authorization) {
                const decodedToken = await AuthService.jwtVerify(
                    req.headers.authorization
                );
                if (decodedToken.type === 'authorization') {
                    // eslint-disable-next-line require-atomic-updates
                    req.isAuth = true;
                    // eslint-disable-next-line require-atomic-updates
                    req.userId = decodedToken._id;
                }
                next();
            } else {
                req.isAuth = false;
                next();
            }
        } catch (err) {
            console.log('err', err);
        }
    };
})();
