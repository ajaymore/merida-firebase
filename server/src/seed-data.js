const { User, Role } = require('./models');
const admin = require('firebase-admin');

module.exports = () =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await admin.auth().getUserByEmail(process.env.SUPER_ADMIN_USER);
      resolve(user);
    } catch (error) {
      try {
        /* create super user */

        const userRecord = await admin.auth().createUser({
          email: process.env.SUPER_ADMIN_USER,
          emailVerified: true,
          password: 'Tobopee7',
          displayName: 'Merida Super Admin',
        });

        await User.remove({});
        await Role.remove({});

        const newUser = await new User({
          email: userRecord.email,
          displayName: userRecord.displayName,
          uid: userRecord.uid,
          isAdmin: true,
        }).save();

        /* create preconfigured roles */

        const adminRole = new Role({
          name: 'Admin',
        });

        adminRole.users = [newUser._id];
        await adminRole.save();

        await new Role({
          name: 'Team Leader',
        }).save();

        await new Role({
          name: 'Team Member',
        }).save();

        await new Role({
          name: 'Mentor',
        }).save();

        await new Role({
          name: 'Facilitator',
        }).save();

        await new Role({
          name: 'Sponsor',
        }).save();

        resolve(newUser);
      } catch (err) {
        reject(err);
      }
    }
  });
