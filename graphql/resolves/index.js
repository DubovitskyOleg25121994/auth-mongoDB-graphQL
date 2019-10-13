(() => {
    'use strict';

    const merge = require('lodash.merge');
    const authResolver = require('./auth.resolver');
    const userResolver = require('./user.resolver');

    module.exports = merge({}, authResolver, userResolver);
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
