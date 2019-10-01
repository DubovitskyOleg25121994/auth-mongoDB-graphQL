(() => {
  const AuthService = require('../services/auth.service');

  exports.jwtCheck = async function (req, res, next) {
    try {
      if (req && req.headers && req.headers.authorization) {
        const decodedToken = await AuthService.jwtVerify(
          req.headers.authorization,
        );

        if (decodedToken.type === 'authorization') {
          req.userId = decodedToken.id;
        }
        next();
      } else {
        throw new Error(
          JSON.stringify({
            status: 400,
            type: 'No token provided',
          }),
        );
      }
    } catch (err) {
      next(err);
    }
  };
})();
