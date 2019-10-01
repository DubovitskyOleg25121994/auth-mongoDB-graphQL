(() => {
  const jwtAuth = require('../authentication/auth');

  module.exports = function (app) {
    app.get('/auth/:id', jwtAuth.auth);
    app.post('/auth/signup', jwtAuth.register);
    app.post('/auth/signin', jwtAuth.login);
    app.put('/auth/activation', jwtAuth.activation);
  };
})();
