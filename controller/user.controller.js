(() => {
  const userModel = require('../models/user.model');

  module.exports = {
    update,
  };


  async function update(req, res, next) {
    try {
      const { _id, name } = req.body;
      await userModel.findOneAndUpdate({ _id }, { name });
      res.status(200).send({ status: 200, type: 'User was update' });
    } catch (err) {
      next(err);
    }
  }
})();
