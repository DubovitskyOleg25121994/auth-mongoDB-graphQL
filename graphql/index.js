(()=>{
    'use strict';

    const { makeExecutableSchema } = require ('graphql-tools');
    const typeDefs = require('../graphql/schema/index');
    const resolvers = require('../graphql/resolves/index');

    module.exports = makeExecutableSchema({
        typeDefs,
        resolvers
    });

})();