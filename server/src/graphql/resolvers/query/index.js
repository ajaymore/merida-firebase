const { requiresAuth } = require('../permissions');

module.exports = {
  user: requiresAuth.createResolver((parent, args, { User, auth }) =>
    User.findOne({ uid: auth.uid })),
  companiesSuperAdmin: requiresAuth.createResolver(async (parent, args, { Company }) => {
    console.log(args);
    return Company.find({});
  }),
};
