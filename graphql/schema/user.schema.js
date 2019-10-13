(() => {
    'use strict';

    const { buildSchema } = require('graphql');

    module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        activationToken: String
      }
    input UserInputUpdate{
      _id: ID!
      name: String
      email: String
      password: String
      activationToken: String
    }

    type getUser{
      _id: ID!
      name: String!
      email: String!
    }
    
    type RootQuery {
        getUser(_id:ID!):getUser
      }
      type RootMutation {
        updateUser(userInput: UserInputUpdate): User
      }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
    `);
})();
