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
    
    input UserInput {
      name: String!
      email: String!
      password: String!
    }
    
    input UserActivationToken{
     activationToken: String!
    }
    
    type AuthData {
      token: String!
    }
    
    type checkLogin {
      _id:  ID!
      name: String!
      email: String!
    }
    
    type RootQuery {
      login(email: String!, password: String!): AuthData!
      auth(_id:ID!):checkLogin
    }
    type RootMutation {
      register(userInput: UserInput): User
      activation(userInput: UserActivationToken): User
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
    `);
})();
