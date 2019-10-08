(() => {
    'use strict';

    const authResolver = require('./auth.resolver');
    const userResolver = require('./user.resolver');

    const rootResolver = {
        ...authResolver,
        ...userResolver
    };

    module.exports = rootResolver;
})();
