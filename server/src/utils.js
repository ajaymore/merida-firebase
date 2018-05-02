const admin = require('firebase-admin');

exports.checkToken = (req) => {
  if (req.headers && (req.headers.authorization || req.headers.Authorization)) {
    const parts = req.headers.authorization
      ? req.headers.authorization.split(' ')
      : req.headers.Authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
    return false;
  }
  return false;
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = exports.checkToken(req);
    req.user = await admin.auth().verifyIdToken(token);
    return next();
  } catch (error) {
    res.status(400).send({ error });
  }
};

exports.isLoggedInGraphQL = async (req, res, next) => {
  try {
    const token = exports.checkToken(req);
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    next();
  }
};
