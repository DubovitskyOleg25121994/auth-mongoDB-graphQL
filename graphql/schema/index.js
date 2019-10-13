(() => {
    'use strict';

    const { mergeSchemas } = require('graphql-tools');
    const auth = require('./auth.schema');
    const user = require('./user.schema');

    module.exports = mergeSchemas({
        schemas: [auth, user]
    });
})();