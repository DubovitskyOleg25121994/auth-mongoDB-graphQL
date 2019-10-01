(() => {
  const user = require('../controller/user.controller');

  module.exports = function (app) {
    app.put('/user/update', user.update);
  };
})();
