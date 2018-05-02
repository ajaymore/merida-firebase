const { requiresAuth } = require('../permissions');
const admin = require('firebase-admin');

module.exports = {
  createUser: requiresAuth.createResolver(async (parent, args, { User }) => {
    const { userInput } = args;

    const userRecord = await admin.auth().createUser({
      emailVerified: true,
      ...userInput,
    });

    const newUser = new User({ ...userInput, uid: userRecord.uid });
    return newUser.save();
  }),
};
