(() => {
  const userModel = require("../models/user.model");
  const AuthService = require("../services/auth.service");

  module.exports = {
    auth,
    register,
    login,
    activation
  };

  async function auth(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await userModel.findById({ userId });
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }

  async function register(req) {
    try {
      const { password, email, name } = req;
      console.log("req", req);
      const user = await userModel.get({ email });
      if (user) {
        throw new Error(
          JSON.stringify({
            status: 400,
            type: "That user is already exists"
          })
        );
      }

      const hash = await AuthService.generateHash(password);
      const data = {
        name,
        email,
        password: hash
      };

      const newUser = await userModel.create(data);
      const jwtCreate = await AuthService.jwtCreate(newUser, {
        type: "activation"
      });

      const result = await userModel.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: jwtCreate.user._id },
        { activationToken: jwtCreate.token }
      );
      // res.status(200).send({ status: 200, type: 'user was register' });
      return result;
    } catch (err) {
      console.log("err", err);
      return err;
      // next(err);
    }
  }

  async function login(req) {
    try {
      const { email, password } = req;
      const user = await userModel.get({ email });
      await AuthService.comparePassword(password, user);
      if (!user) {
        throw new Error(
          JSON.stringify({
            status: 400,
            type: "User doesn't exists"
          })
        );
      }

      if (!user.activationToken) {
        return await AuthService.jwtCreate(user);
      } else {
        throw new Error(
          JSON.stringify({
            status: 403,
            type: "Not confirmed email"
          })
        );
      }
    } catch (err) {
      // console.log("err", err);
      return err;
      // next(err);
    }
  }

  async function activation(req) {
    try {
      const { activationToken } = req;
      const decodedToken = await AuthService.jwtVerify(activationToken);
      if (decodedToken.type === "activation") {
        const user = await userModel.get({ _id: decodedToken._id });
        console.log('user', user)
        if (!user) {
          throw new Error(
            JSON.stringify({
              status: 400,
              type: "User doesn't exists"
            })
          );
        } else if (user.activationToken === activationToken) {
         return await userModel.findOneAndUpdate({ _id: user._id },{ activationToken: '' });
        } else {
          throw new Error(
            JSON.stringify({
              status: 400,
              type: "Email is already confirmed"
            })
          );
        }
      } else {
        JSON.stringify({
          status: 400,
          type: "Token type verify error!"
        });
      }
    } catch (err) {
      return err;
    }
  }
})();
