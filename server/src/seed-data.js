const { User, Role, Company } = require('./models');
const admin = require('firebase-admin');

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      await admin.auth().getUserByEmail(process.env.SUPER_ADMIN_USER);
      resolve();
    } catch (error) {
      try {
        /* create super user */
        const userRecord = await admin.auth().createUser({
          email: process.env.SUPER_ADMIN_USER,
          emailVerified: true,
          password: 'Tobopee7',
          displayName: 'EHS Super Admin',
        });

        await User.remove({});
        await Company.remove({});

        const newUser = await new User({
          email: userRecord.email,
          displayName: userRecord.displayName,
          uid: userRecord.uid,
          superAdmin: true,
        }).save();

        /* create preconfigured roles */
        await Role.remove({});

        await new Role({
          name: 'Site Planner',
        }).save();

        await new Role({
          name: 'Corporate Planner',
        }).save();

        const newCompany = await new Company({
          name: 'EHS Planner',
          users: [newUser._id],
        }).save();

        newUser.company = newCompany._id;
        await newUser.save();

        resolve();
      } catch (err) {
        reject(err);
      }
    }
  });
