const { requiresAuth } = require('../permissions');

module.exports = {
  user: requiresAuth.createResolver((parent, args, { User, auth }) =>
    User.findOne({ uid: auth.uid })),
  roles: (parent, args, { Role }) => Role.find({}),
};
