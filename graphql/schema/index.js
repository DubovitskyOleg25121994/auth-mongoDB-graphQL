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

    input UserInputUpdate{
      _id: ID!
      name: String
      email: String
      password: String
      activationToken: String
    }

    input UserActivationToken{
     activationToken: String!
    }

    type getUser{
      _id: ID!
      name: String!
      email: String!
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
      getUser(_id:ID!):getUser
    }
    type RootMutation {
      register(userInput: UserInput): User
      updateUser(userInput: UserInputUpdate): User
      activation(userInput: UserActivationToken): User
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
    `);
})();


//for test

// mutation {
//   register(userInput:{name:"asdasd",email:"asdgfd@mail.ru",password:"123"}){
//     _id
//   }
// }


// query{
//   login(email:"1234@mail.ru", password: "123"){
//   token
//   }
// }

