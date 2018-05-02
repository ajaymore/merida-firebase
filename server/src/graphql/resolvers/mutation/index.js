const { requiresAuth } = require('../permissions');
const admin = require('firebase-admin');

module.exports = {
  createCompany: requiresAuth.createResolver(async (parent, args, { User, Company }) => {
    const { companyName, companyAdminInput } = args;
    const newCompany = await new Company({ name: companyName }).save();

    const userRecord = await admin.auth().createUser({
      emailVerified: true,
      ...companyAdminInput,
    });

    const newUser = new User({ ...companyAdminInput, companyAdmin: true, uid: userRecord.uid });
    newUser.company = newCompany._id;
    await newUser.save();

    newCompany.users = [newUser._id];
    return newCompany.save();
  }),
};
